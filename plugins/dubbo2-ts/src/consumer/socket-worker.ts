import net from 'net';
import debug from 'debug';
import Context from './context';
import DubboEncoder from './encode';
import DecodeBuffer from './decode-buffer';
import {decode} from './decode';
import HeartBeat from './heartbeat';
import {SOCKET_STATUS} from './socket-status';
import {ISocketProps, ISocketSubscriber} from './types';

const log = debug('dubbo:socket-worker');
const DEFAULT_HEARTBEAT = 120 * 1000;  //心跳时间
const RETRY_TIMES = 3;  //心跳失败次数
let pid = 0; //一个tcp连接的标识


export default class SocketWorker {
    private _host: string;
    private _retry: number;
    private _status: SOCKET_STATUS;
    private _port: string;
    private pid: number;
    private reconnectCount: number;
    private _decodeBuff: DecodeBuffer;
    private _socket: net.Socket;
    private _subscriber: ISocketSubscriber;
    private _timeId?: null | ReturnType<typeof setTimeout> = null;
    private _reconnectTimeId?: null | ReturnType<typeof setTimeout> = null;

    constructor(options: ISocketProps) {
        this.pid = ++pid;
        this._retry = 0;
        this._status = SOCKET_STATUS.PADDING;
        this.reconnectCount = 0;
        this._decodeBuff = new DecodeBuffer().subscribe(this._onSubscribeDecodeBuff);
        this._host = options.host;
        this._port = options.port;
        this._socket = this._initSocket();
        this._subscriber = {
            onConnect: options.onConnect,
            onData: options.onData,
            onClose: options.onClose
        };
    }

    _onData = (data: Buffer) => {
        this._decodeBuff.receive(data);
    };

    _onError(error: Error) {
        log(`SocketWorker#${this.pid} <=occur error=> ${this._host}:${
            this._port
            } ${error}`);
    }

    _onClose() {
        this._decodeBuff.clearBuffer();
        //健康检查了3次的时间段内,所有请求失败都会尝试重连
        if (this._retry < RETRY_TIMES) {
            this._status = SOCKET_STATUS.RETRY;
            this.reconnect();
        } else {
            this._status = SOCKET_STATUS.CLOSED;
            this._subscriber.onClose();
        }
    }

    /**
     * @description  发送请求到服务
     * @param ctx dubbo context
     */
    write(ctx: Context) {
        log(`SocketWorker#${this.pid} =invoked=> ${ctx.requestId}`);
        ctx.pid = this.pid;
        const encoder = new DubboEncoder(ctx);
        this._socket.write(encoder.encode());
    }

    /**
     * @description 创建tcp链接
     * @param 地址 ，端口
     */
    _initSocket() {
        this.destroy();
        const _socket = new net.Socket();
        _socket.setNoDelay(true);  //禁用 Nagle的算法
        _socket.connect(Number(this._port), this._host, () => {
            this._status = SOCKET_STATUS.CONNECTED;
            this._reset();//连接成功，重置次数
            this._subscriber.onConnect();
            this._healthReset();//开启心跳
            log(`SocketWorker#${this.pid} <=connected=> ${this._port}:${this._host}`);
        }).on('data', this._onData.bind(this))
            .on('error', this._onError.bind(this))
            .on('close', this._onClose.bind(this));
        return _socket;
    }

    /**
     * @description 获取当前连接状态
     */
    get status() {
        return this._status;
    }

    /**
     * @description 销毁连接
     */
    destroy() {
        if (this._socket) {
            this._socket.destroy();
        }
    }

    /**
     * @description 重置 心跳 重连次数
     */
    _reset() {
        this.reconnectCount = 0; //重连失败次数重置
        this._retry = 0;  //心跳失败次数重置
    }

    /**
     * @description 心跳检查
     */
    _healthReset() {
        clearTimeout(this._timeId);
        this._timeId = setTimeout(() => {
            this._retry = this._retry + 1;
            this._socket.write(HeartBeat.encode());
            if (this._retry <= RETRY_TIMES) {
                this._healthReset();
            }
            if (this._retry > 1) {
                //超时错误不一定立即触发，手动触发
                this._onClose();
            }
            log(`RETRY_TIMES %S`, this._retry);
        }, DEFAULT_HEARTBEAT);
    }

    /**
     * @description 重连机制
     */
    reconnect() {
        if (this.reconnectCount <= 20) {
            clearTimeout(this._reconnectTimeId);//避免多次同时调用多个close事件触发
            this._reconnectTimeId = setTimeout(() => {
                this.reconnectCount = this.reconnectCount + 1;
                this._socket = this._initSocket();
            }, 3000);
        } else {
            this.destroy();
        }
    }

    /**
     * @description 换实例重连,主要应用于集群内部动态ip端口的时候
     */
    reInitSocket(option) {
        this._host = option.host;
        this._port = option.port;
        this._reset(); //重置 心跳 重连失败次数，防止首次连接失败不再尝试
        this._initSocket();
    }

    private _onSubscribeDecodeBuff = (data: Buffer) => {
        if (HeartBeat.isHeartBeat(data)) {
            this._retry = 0; //心跳成功 失败次数清零
            log(`SocketWorker#${this.pid} <=receive= heartbeat data.`);
        } else {
            const json = decode(data);
            log(`SocketWorker#${this.pid} <=received=> dubbo result %O`, json);
            this._subscriber.onData(json);
        }
    };

}