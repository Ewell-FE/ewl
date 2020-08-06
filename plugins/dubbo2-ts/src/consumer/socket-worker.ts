import net from 'net';
import debug from 'debug';
import Context from './context';
import DubboEncoder from './encode';
import DecodeBuffer from './decode-buffer';
import {decode} from './decode';
import HeartBeat from './heartbeat';
import {ISocketProps, ISocketSubscriber} from './types';

const log = debug('dubbo:socket-worker');
const DEFAULT_HEARTBEAT = 60 * 1000;  //心跳时间
const RETRY_TIMES = 3;  //心跳失败次数
let pid = 0;


export default class SocketWorker {
    private _host: string;
    private _retry: number;
    private _port: string;
    private pid: number;
    private reconnectCount: number;
    private _decodeBuff: DecodeBuffer;
    private _socket: net.Socket;
    private _subscriber: ISocketSubscriber;
    private _timeId?: number;
    private _reconnectTimeId?: number;

    constructor(options: ISocketProps) {
        this.pid = ++pid;
        this._retry = 0;
        this.reconnectCount = 0;
        this._decodeBuff = new DecodeBuffer().subscribe(this._onSubscribeDecodeBuff);
        this._host = options.host;
        this._port = options.port;
        this._socket = this._initSocket(options.host, options.port);
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
        //刚启动就没连成功 或者 过程中断开 健康检查了3次 则尝试重连
        if (this._retry === 0 || this._retry > 3) {
            this.reconnect();
        }
    }

    /**
     * send data to dubbo service
     * @param ctx dubbo context
     */
    write(ctx: Context) {
        log(`SocketWorker#${this.pid} =invoked=> ${ctx.requestId}`);
        //current dubbo context record the pid
        //when current worker close, fail dubbo request
        ctx.pid = this.pid;
        const encoder = new DubboEncoder(ctx);
        // this.setWriteTimestamp();
        this._socket.write(encoder.encode());
    }

    /**
     * @description 创建tcp链接
     * @param 地址 ，端口
     */
    _initSocket(host: string, port: string) {
        if (this._socket) {
            this._socket.destroy();
        }
        const _socket = new net.Socket();
        _socket.setNoDelay();
        _socket.connect(Number(port), host, () => {
            this.reconnectCount = 0; //重连失败次数重置
            this._retry = 0;  //心跳失败次数重置
            this._subscriber.onConnect();
            this._healthReset();//开启心跳
            log(`SocketWorker#${this.pid} <=connected=> ${host}:${port}`);
        }).on('data', this._onData.bind(this))
            .on('error', this._onError.bind(this))
            .on('close', this._onClose.bind(this));
        return _socket;
    }

    /**
     * @description 创建tcp链接
     */
    _healthReset() {
        clearTimeout(this._timeId);
        this._timeId = setTimeout(() => {
            this._retry = this._retry + 1;
            this._socket.write(HeartBeat.encode());
            if (this._retry <= RETRY_TIMES) {
                this._healthReset();
            }
        }, DEFAULT_HEARTBEAT);
    }

    /**
     * @description 创建tcp链接
     */
    reconnect() {
        if (this.reconnectCount <= 10) {
            clearTimeout(this._reconnectTimeId);//避免多次同时调用多个close事件触发
            this._reconnectTimeId = setTimeout(() => {
                this.reconnectCount = this.reconnectCount + 1;
                this._socket = this._initSocket(this._host, this._port);
            }, 3000);
        } else {
            this._socket.destroy();
        }
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