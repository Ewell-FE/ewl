import {DirectlyDubbo} from '../../consumer/directly-dubbo';
import * as openApi from '../open-api';
import {setting} from './setting';
import {
    Middleware,
    TDubboService
} from '../../consumer/types';
import Context from '../../consumer/context';
import debug from 'debug';
import config from '../config';
import {classFactory} from './class-factory';

const log = debug('nacos:bootstrap ');

interface INacosClientProps {
    application: {name: string};
    register: string,
    dubboInvokeTimeout?: number,
    dubboSocketPool?: number,
    dubboSetting: setting
}

export class nacosClient<TService = {[key: string]: {[key: string]: Function}}> {

    private readonly _props: INacosClientProps;
    private readonly _service: TDubboService<TService> = Object.create({});
    private readonly _instances: Map<string, Array<DirectlyDubbo>> = new Map();
    private readonly _middleware: Array<Middleware<Context>> = [];

    constructor(options: INacosClientProps) {
        this._props = options;
        if (!options.dubboSetting) {
            throw new Error('Please specify dubboSetting');
        }
        if (typeof options.register !== 'string') {
            throw new Error('Nacos register must be string ');
        }
        this._registryInstances();
    }

    //获取service实例列表
    get service() {
        return this._service;
    }

    //use中间件
    use(fn) {
        if (typeof fn != 'function') {
            throw new TypeError('middleware must be a function');
        }
        log('use middleware %s', fn._name || fn.name || '-');
        this._middleware.push(fn);
        return this;
    }


    /**
     * @description  服务重新注册
     */
    _serviceDiscoveryRegistry(serviceName) {
        let _instances = this._instances.get(serviceName) || [];
        openApi.getAllInstances({
            serviceName: serviceName
        }).then(function(res: string) {
            let json = JSON.parse(res);
            let hosts = json.hosts;
            let len = hosts.length;
            if (len === 0) {
                throw new Error(`serviceDiscoveryRegistry : hosts could not find any avaliable socekt worker`);
                return null;
            }
            let address = hosts.map(function(item) {
                return item.ip + ':' + item.port;
            });
            _instances.map(function(directlyWorker) {
                directlyWorker.reInitSocket(address);
            });
        }).catch(function(e) {
            console.error(e);
        });
    }

    /**
     * @description  根据 dubboSetting 配置的 serviceName 获取hosts实例列表
     */
    _registryInstances() {
        let self = this;
        let DubboSettings = this._props.dubboSetting.getAllDubboSetting();
        let requestArray = DubboSettings.map(function(item) {
            return openApi.getAllInstances({
                serviceName: item.dubboSetting.serviceName
            });
        });
        Promise.all(requestArray).then(function(arr) {
            arr.forEach(function(res: string) {
                let json = JSON.parse(res);
                let hosts = json.hosts;
                let len = hosts.length;
                if (len === 0) {
                    throw new Error(`hosts could not find any avaliable socekt worker`);
                    return null;
                }
                let serviceSetting = self._props.dubboSetting.getDubboSettingByName(json.dom);
                let SocketPool = self._props.dubboSocketPool || config.dubboSocketPool; //默认创建一个连接
                let dubboArray = [];
                let address = hosts.map(function(item) {
                    return item.ip + ':' + item.port;
                });
                for (let i = 0; i < SocketPool; i++) {
                    let dubbo = DirectlyDubbo.from({
                        dubboAddress: address,
                        dubboVersion: serviceSetting.dubboSetting.version,
                        dubboInvokeTimeout: self._props.dubboInvokeTimeout || config.dubboInvokeTimeout
                    });
                    dubbo.use(self._middleware);
                    dubboArray.push(dubbo);
                }

                self._instances.set(json.dom, dubboArray);
                self._registryService();
            });
        });
    }

    /**
     * @description  暴漏给注册中心通知接口的方法，只支持express
     */
    middleware(req, res, next) {
        this._serviceDiscoveryRegistry(req.param('serviceName'));
        res.send('OK');
    }

    /**
     * 注册服务到 nacos 容器中
     * @param service nacos需要管理的接口服务
     * service style:
     * {[key: string]: (directlyDubbo): T => directlyDubbo.proxyService<T>({...})}
     */
    private _registryService() {
        let self = this;
        let DubboSettings = this._props.dubboSetting.getAllDubboSetting();
        DubboSettings.map((item) => {
            let dubboSetting = item.dubboSetting;
            let service = new classFactory([
                'dubbo://192.168.150.55:20886/cc.ewell.message.api.service.EchoService?anyhost=true&application=message-provider&default=true&deprecated=false&dubbo=2.0.2&dynamic=true&generic=false&interface=cc.ewell.message.api.service.EchoService&metadata-type=remote&methods=echo&pid=7933&release=2.7.7&revision=1.0.0&side=provider&threadpool=fixed&timestamp=1598529000565&version=1.0.0',
                'dubbo://192.168.150.55:20886/cc.ewell.message.api.service.IMessageDubboService?anyhost=true&application=message-provider&default=true&deprecated=false&dubbo=2.0.2&dynamic=true&generic=false&interface=cc.ewell.message.api.service.IMessageDubboService&metadata-type=remote&methods=messageTemplateStateChange,collectMessage,deleteDraftMessage,revokeMessage,getReceiveMessageList,getMessageByMsgId,sendMessage,deleteMessage,getTemplateType,cancleCollectMessage,addMessageTemplate,markMessageReaded,sendDraftMessage,sendSms,recoverMessage,getTypeMessageTemplate,getFirstCatgListNurse,getMessageStatusByMsgIds,getSendMessageList,getMessageTemplateById,claimMessage,editMessageTemplate,editMessageByMsgId&pid=7933&release=2.7.7&revision=1.0.0&side=provider&threadpool=fixed&timestamp=1598529003653&version=1.0.0'
            ]).create();
            for (let key in service) {
                let hosts = self._instances.get(dubboSetting.serviceName);
                let len = hosts.length;
                self._service[key] = service[key](hosts[Math.floor(Math.random() * len)]);
            }
        });
    }
}