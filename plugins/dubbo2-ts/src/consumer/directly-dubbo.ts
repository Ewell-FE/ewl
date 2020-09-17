import compose from 'koa-compose';
import Context from './context';
import debug from 'debug';
import {SOCKET_STATUS} from './socket-status';
import SocketWorker from './socket-worker';
import {IDirectlyDubboProps, IHessianType, IInvokeParam, Middleware} from './types';
import {noop} from './util';

const log = debug('directly-dubbo');

export class DirectlyDubbo {

    private _options: IDirectlyDubboProps;
    private _queue: Map<number, Context>;
    private readonly _socketWorker: Array<SocketWorker>;
    private _middleware: Array<Middleware<Context>> = [];
    private _subscriber: {
        onConnect: Function;
        onData: Function;
        onClose: Function;
    };

    constructor(options: IDirectlyDubboProps) {
        this._queue = new Map();
        this._options = options;
        this._subscriber = {
            onConnect: noop,
            onData: noop,
            onClose: noop
        };
        this._socketWorker = this._createSocketAgents(options.dubboAddress);
    }


    _createSocketAgents(dubboAddress: string | Array<string>) {
        if (Array.isArray(dubboAddress)) {
            let socketAgents = dubboAddress.map((address) => {
                const [host, port] = address.split(':');
                return new SocketWorker({
                    host: host,
                    port: port,
                    onConnect: this.onConnect,
                    onData: this.onData,
                    onClose: this.onClose
                });
            });
            return socketAgents;
        } else if (typeof dubboAddress === 'string') {
            const [host, port] = dubboAddress.split(':');
            return [new SocketWorker({
                host: host,
                port: port,
                onConnect: this.onConnect,
                onData: this.onData,
                onClose: this.onClose
            })];
        }
    }

    _getConnectedSocketAgents() {
        let agent = this._socketWorker.filter(function(socketWorker) {
            return socketWorker.status === SOCKET_STATUS.CONNECTED;
        });
        let len = agent.length;
        if (len === 0) {
            for (let ctx of this._queue.values()) {
                ctx.reject(new Error('socket-worker was closed.'));
                ctx.cleanTimeout();
            }
            this._queue.clear();
            throw new Error(`this._socketWorker could not find any connected socket worker`);
        } else if (len > 0) {
            return agent[Math.floor(Math.random() * len)];
        }
    }

    static from(options: IDirectlyDubboProps) {
        return new DirectlyDubbo(options);
    }

    proxyService<T extends Object>(invokeParam: IInvokeParam): T {
        const {dubboInterface, methods, timeout, group, version} = invokeParam;
        const proxy = Object.create({});

        Object.keys(methods).forEach(methodName => {
            proxy[methodName] = (...args: Array<IHessianType>) => {
                return new Promise(async (resolve, reject) => {
                    const ctx = Context.create();
                    ctx.resolve = resolve;
                    ctx.reject = reject;
                    ctx.methodName = methodName;
                    const method = methods[methodName];
                    ctx.methodArgs = method.call(invokeParam, ...args) || [];
                    ctx.dubboVersion = this._options.dubboVersion;
                    ctx.dubboInterface = dubboInterface;
                    ctx.path = dubboInterface;
                    ctx.group = group;
                    ctx.timeout = timeout || this._options.dubboInvokeTimeout;
                    ctx.version = version || ctx.dubboVersion;

                    //check param
                    //param should be hessian data type
                    if (!ctx.isMethodArgsHessianType) {
                        log(
                            `${dubboInterface} method: ${methodName} not all arguments are valid hessian type`
                        );
                        log(`arguments->${JSON.stringify(ctx.methodArgs, null, 2)}`);
                        reject(new Error('not all arguments are valid hessian type'));
                        return;
                    }
                    //超时检测
                    ctx.timeoutId = setTimeout(() => {
                        const {requestId} = ctx;
                        log(`${dubboInterface} method: ${methodName} invoke timeout`);
                        this.fail(requestId, new Error('remote invoke timeout'));
                    }, this._options.dubboInvokeTimeout * 1000);

                    log('middleware->', this._middleware);
                    const fn = compose(this._middleware);
                    try {
                        await fn(ctx);
                    } catch (err) {
                        log(err);
                    }
                    //add task to queue
                    this.addQueue(ctx);
                }).then(res => ({
                    res,
                    err: null
                })).catch(err => ({
                    res: null,
                    err
                }));
            };
        });

        return proxy;
    }


    /**
     * extends middleware, api: the same as koa
     * @param fn
     */
    use(fn) {
        let arr = Array.isArray(fn) ? fn : [fn];
        for (let i = 0; i < arr.length; i++) {
            if (typeof arr[i] != 'function') {
                throw new TypeError('middleware must be a function');
            }
            log('use middleware %s', arr[i]._name || arr[i].name || '-');
            this._middleware.push(arr[i]);
        }
        return this;
    }


    /**
     * 成功的处理队列的任务
     * @param requestId
     * @param res
     */
    private success(requestId: number, res: any) {
        const ctx = this._queue.get(requestId);
        if (!ctx) {
            return;
        }
        const {resolve} = ctx;
        resolve(res);
        ctx.cleanTimeout();
        this._queue.delete(requestId);
    }

    /**
     * 失败的处理队列的任务
     * @param requestId
     * @param err
     */
    private fail(requestId: number, err: Error) {
        const ctx = this._queue.get(requestId);
        if (!ctx) {
            return;
        }
        const {reject} = ctx;
        reject(err);
        ctx.cleanTimeout();
        this._queue.delete(requestId);
    }

    private addQueue(ctx: Context) {
        const {requestId} = ctx;
        this._queue.set(requestId, ctx);
        let socketWorker = this._getConnectedSocketAgents();
        log(`current socketworkder=> ${socketWorker.status}`);

        //根据当前socket的worker的状态，来对任务进行处理
        switch (socketWorker.status) {
            case SOCKET_STATUS.PADDING:
                break;
            case SOCKET_STATUS.CONNECTED:
                socketWorker.write(ctx);
                break;
            case SOCKET_STATUS.CLOSED:
                this.fail(requestId, new Error(`SocketWorker had closed.`));
                break;
        }
    }

    //动态ip重连
    reInitSocket(address: string | Array<string>) {
        //todo：为保证滚动重启，不能一次全断开。需要有个机制去依次重连断开
        let addressList = typeof address === 'string' ? [address] : address;
        // 多余的老连接 移除销毁
        if (addressList.length < this._socketWorker.length) {
            this._socketWorker.splice(addressList.length).forEach((agent) => {
                agent.destroy();
            });
        }
        addressList.forEach((dubboAddress, index) => {
            const [host, port] = dubboAddress.split(':');
            if (this._socketWorker[index]) {
                this._socketWorker[index].reInitSocket({
                    host,
                    port
                });
            } else {
                this._socketWorker.push(new SocketWorker({
                    host: host,
                    port: port,
                    onConnect: this.onConnect,
                    onData: this.onData,
                    onClose: this.onClose
                }));
            }
        });
    }


    subscribe(subscriber) {
        this._subscriber = {
            ...this._subscriber,
            ...subscriber
        };
        return this;
    }

    //===================socket event===================
    private onConnect = () => {
        let socketWorker = this._getConnectedSocketAgents();
        for (let ctx of this._queue.values()) {
            //如果还没有被处理
            if (ctx.isNotScheduled) {
                socketWorker.write(ctx);
            }
        }
        //有连上的服务就触发
        this._subscriber.onConnect();
    };

    private onData = (opts: any) => {
        const {requestId, res, err} = opts;
        log(`onData->requestId#${requestId} err?: ${err != null}`);
        err ? this.fail(requestId, err) : this.success(requestId, res);
    };

    private onClose = () => {
        log('SocketWorker was closed');
        //有实例断开，则尝试获取是否还有健康实例
        try {
            this._getConnectedSocketAgents();
        } catch (e) {
            //没有连上的服务了才触发
            this._subscriber.onClose();
            console.error(e);
        }
    };
}