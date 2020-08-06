import {IBase} from './Interface';

let global: any = {};
if (typeof window !== 'undefined') {
    global = window;
}

export default class caSdk implements IBase {
    private times: number;
    private signTxtUrl: string;  //获取二维码 接口地址
    private getSignTxtUrl: string; //轮训状态接口地址
    private http: any;   //ajax
    private timer: any;  //轮训次数  每次固定3s
    private subscribeEvent: any;  //轮训状态每次通知
    private getBase64Event: any;  // 获取二维码事件通知

    constructor(option) {
        this.signTxtUrl = option.signTxtUrl;
        this.getSignTxtUrl = option.getSignTxtUrl;
        this.http = option.http;
        this.times = option.times || 20;
        this.subscribeEvent = option.subscribeEvent;
        this.getBase64Event = option.getBase64Event;

        this.getSignTxt = this.getSignTxt.bind(this);
        this.signFetch = this.signFetch.bind(this);
        this.signTxt = this.signTxt.bind(this);
    }

    /**
     * @description 验证是否扫码成功
     */
    getSignTxt(url, bizSn, resolve) {
        this.http(url || this.getSignTxtUrl, {
            bizSn
        }).then((result) => {
            this.subscribeEvent && this.subscribeEvent(result, resolve)
        });
    }


    //签章 二维码 接口请求
    signFetch(url: string, options = {signType: '1'}, obj = {}, resolve, reject) {
        Object.assign(options, {
            signType: options.signType || "1"
        })

        let that = this;
        if (options.signType === '1') {
            that.http(url || that.signTxtUrl, options, obj).then(function (data) {
                if (data.state === 'success') {
                    resolve({
                        ...data,
                        signType: '1'
                    });
                } else {
                    that.signFetch(url, {
                        ...options,
                        signType: '2'
                    }, obj, resolve, reject);
                }
            }).catch(e => {
                reject(e);
            });
        } else if (options.signType === '2') {
            that.http(url || that.signTxtUrl, options, obj).then((result) => {
                //拿到二维码，展示到弹框
                that.getBase64Event && that.getBase64Event(result)
                that.subscribe(result.data, resolve);
                // resolve({
                //   ...result,
                //   signType: '2'
                // });
            }).catch(e => {
                reject(e);
            });
        }
    }

    /**
     * @description 尝试免密验证, 获取二维码
     */
    signTxt(url: string, options = {signType: '1'}, obj?: any): Promise<string> {
        let that = this
        return new Promise((resolve, reject) => {
            that.signFetch(url, {
                ...options
            }, obj || {}, resolve, reject);
        });
    }


    /**
     * @description 开始轮训扫码状态  1分钟后无响应，则点击重新扫码
     */
    subscribe(key, resolve) {
        let that = this;
        let num = 0;
        clearInterval(this.timer); //避免重复订阅
        that.timer = setInterval(() => {
            if (num >= this.times) {
                clearInterval(this.timer);
                this.subscribeEvent && this.subscribeEvent(null, resolve)
            } else {
                that.getSignTxt(undefined, key, resolve);
                num++;
            }
        }, 3000);
    }


    /**
     * @description 主动清除定时器
     */
    clear() {
        clearInterval(this.timer);
    }
}

