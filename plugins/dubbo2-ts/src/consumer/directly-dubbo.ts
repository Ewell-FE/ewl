import Context from './context';
import debug from 'debug';
import {SOCKET_STATUS} from './socket-status';
import SocketWorker from './socket-worker';
import {IDirectlyDubboProps, IHessianType, IInvokeParam} from './types';

const log = debug('directly-dubbo');

export class DirectlyDubbo {

    private _options: IDirectlyDubboProps;
    private _queue: Map<number, Context>;
    private _socketStatus: SOCKET_STATUS;
    private readonly _socketWorker: SocketWorker;

    constructor(options: IDirectlyDubboProps) {
        this._socketStatus = SOCKET_STATUS.PADDING;
        this._queue = new Map();
        this._options = options;
        const [host, port] = options.dubboAddress.split(':');
        this._socketWorker = new SocketWorker({
            host: host,
            port: port,
            onConnect: this.onConnect,
            onData: this.onData,
            onClose: this.onClose
        });

    }

    static from(options: IDirectlyDubboProps) {
        return new DirectlyDubbo(options);
    }

    proxyService<T extends Object>(invokeParam: IInvokeParam): T {
        const {dubboInterface, methods, timeout, group, version} = invokeParam;
        const proxy = Object.create(null);

        Object.keys(methods).forEach(methodName => {
            proxy[methodName] = (...args: Array<IHessianType>) => {
                return new Promise((resolve, reject) => {
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
                    ctx.timeout = timeout;
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

        log(`current socketworkder=> ${this._socketStatus}`);

        //根据当前socket的worker的状态，来对任务进行处理
        switch (this._socketStatus) {
            case SOCKET_STATUS.PADDING:
                break;
            case SOCKET_STATUS.CONNECTED:
                this._socketWorker.write(ctx);
                break;
            case SOCKET_STATUS.CLOSED:
                this.fail(requestId, new Error(`SocketWorker had closed.`));
                break;
        }
    }

    //===================socket event===================
    private onConnect = () => {
        this._socketStatus = SOCKET_STATUS.CONNECTED;

        for (let ctx of this._queue.values()) {
            //如果还没有被处理
            if (ctx.isNotScheduled) {
                this._socketWorker.write(ctx);
            }
        }
    };

    private onData = (opts: any) => {
        const {requestId, res, err} = opts;
        log(`onData->requestId#${requestId} err?: ${err != null}`);
        err ? this.fail(requestId, err) : this.success(requestId, res);
    };

    private onClose = () => {
        log('SocketWorker was closed');
        this._socketStatus = SOCKET_STATUS.CLOSED;
        //failed all
        for (let ctx of this._queue.values()) {
            ctx.reject(new Error('socket-worker was closed.'));
            ctx.cleanTimeout();
        }
        this._queue.clear();
    };
}