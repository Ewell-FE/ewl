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
import {METADATA_INTERFACE} from '../const';

const log = debug('nacos:bootstrap ');

interface INacosClientProps {
    application: {name: string};
    register: string,
    dubboInvokeTimeout?: number,
    dubboSocketPool?: number,
    dubboSetting: setting
}

interface IMetadata {
    'dubbo.metadata-service.url-params': string;
    'dubbo.subscribed-services.revision': string;
}

export class nacosClient<TService = {[key: string]: {[key: string]: Function}}> {

    private readonly _props: INacosClientProps;
    private readonly _dubboInterface: TDubboService<TService> = Object.create({});
    private readonly _service: TDubboService<TService> = Object.create({});
    private readonly _instances: Map<string, Array<DirectlyDubbo>> = new Map();
    private readonly _metadataInstances: Map<string, DirectlyDubbo> = new Map();
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

    //获取service实例列表
    get api() {
        return this._dubboInterface;
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
    _dubboInterfaceDiscoveryRegistry(Metadata_ID) {
        console.log('是否需要自省呢？？？');
    }

    /**
     * @description  根据 dubboSetting 配置的 serviceName 获取hosts实例列表
     */
    _registryInstances() {
        let self = this;
        let DubboSettings = this._props.dubboSetting.getAllDubboSetting();
        let requestArray = DubboSettings.map(function(item) {
            return openApi.getAllInstances({
                serviceName: item.dubboSetting.serviceName,
                groupName: item.dubboSetting.group
            });
        });
        Promise.all(requestArray).then(function(arr) {
            arr.forEach(function(res: string) {
                let json = JSON.parse(res);
                let hosts = json.hosts;
                let len = hosts.length;
                if (len === 0) {
                    throw new Error(`hosts could not find any avaliable socket worker`);
                    return null;
                }
                self._initMetadataService(json);
            });
        });
    }

    /**
     * @description  根据 源数据，连接实例，并且注册方法
     */
    _createDubboByMetaData(Metadata_ID, revisionAddress, result) {
        let self = this;
        let serviceSetting = self._props.dubboSetting.getDubboSettingByName(Metadata_ID.split(':').slice(-1).toString());
        let SocketPool = self._props.dubboSocketPool || config.dubboSocketPool; //默认每个实例创建一次连接
        let dubboArray = [];
        let address = revisionAddress.get(Metadata_ID);
        for (let i = 0; i < SocketPool; i++) {
            let dubbo = DirectlyDubbo.from({
                dubboAddress: address,
                dubboVersion: serviceSetting.dubboSetting.version,
                dubboInvokeTimeout: self._props.dubboInvokeTimeout || config.dubboInvokeTimeout
            }).subscribe({
                onClose: () => {
                    self._dubboInterfaceDiscoveryRegistry(Metadata_ID);
                }
            });
            dubbo.use(self._middleware);
            dubboArray.push(dubbo);
        }
        self._instances.set(Metadata_ID, dubboArray);
        let service = new classFactory(result).create();
        self._registryService(Metadata_ID, service);
    }


    /**
     * @description  连接 metadataService 服务, 按照 revision 分组
     */
    _initMetadataService(json) {
        let self = this;
        let revisionAddress = new Map();
        json.hosts.forEach((item) => {
            let params = JSON.parse(item.metadata['dubbo.metadata-service.url-params']);
            let revision = item.metadata['dubbo.exported-services.revision'];
            let version = params.dubbo.version;
            let group = item.serviceName;  //group：当前 MetadataService 分组，数据使用 serviceName
            let Metadata_ID = `${METADATA_INTERFACE}:${revision}:${group}`; //源数据 dubbo服务id
            let MetadataDubbo = null;
            if (!this._metadataInstances.has(Metadata_ID)) {
                MetadataDubbo = DirectlyDubbo.from({
                    dubboAddress: item.ip + ':' + params.dubbo.port,
                    dubboVersion: version,
                    dubboInvokeTimeout: this._props.dubboInvokeTimeout || config.dubboInvokeTimeout
                }).subscribe({
                    onConnect: async () => {
                        let metaDataDubboUrl = new classFactory([
                            `dubbo://${item.ip}:${params.dubbo.port}/${METADATA_INTERFACE}?&interface=${METADATA_INTERFACE}&methods=getExportedURLs&version=${version}&group=${group}`
                        ]).create();
                        self._registryMetadataService(Metadata_ID, metaDataDubboUrl);
                        let result = await self._dubboInterface[`${Metadata_ID}`].getExportedURLs();
                        this._createDubboByMetaData(Metadata_ID, revisionAddress, result.res);
                    }
                });
            } else {
                MetadataDubbo = this._metadataInstances.get(Metadata_ID);
            }
            let address = revisionAddress.get(Metadata_ID) || [];
            revisionAddress.set(Metadata_ID, [item.ip + ':' + item.port, ...address]);
            this._metadataInstances.set(Metadata_ID, MetadataDubbo);
        });
    }

    /**
     * @description  暴漏给注册中心通知接口的方法，只支持express
     */
    middleware(req, res, next) {
        this._dubboInterfaceDiscoveryRegistry(req.param('serviceName'));
        res.send('OK');
    }


    /**
     * 根据源数据 revision 分组的key来注册 MetadataService 服务 方法
     * @param Metadata_ID  ${服务名:revision} 为key
     * @param service 当前服务的源数据 MetadataService服务
     * service style:
     * {[key: string]: (directlyDubbo): T => directlyDubbo.proxyService<T>({...})}
     */
    private _registryMetadataService(Metadata_ID, service) {
        let self = this;
        for (let interfaceName in service) {
            self._dubboInterface[`${Metadata_ID}`] = service[interfaceName](this._metadataInstances.get(Metadata_ID));
        }
    }


    /**
     * 注册服务到 nacos 容器中
     * @param service nacos需要管理的接口服务
     * service style:
     * {[key: string]: (directlyDubbo): T => directlyDubbo.proxyService<T>({...})}
     */
    private _registryService(Metadata_ID, service) {
        let self = this;
        for (let key in service) {
            let instances = self._instances.get(Metadata_ID);
            let len = instances.length;
            self._dubboInterface[key] = service[key](instances[Math.floor(Math.random() * len)]);
            //为了简化调用，当没有相同服务名称的时候以 `I${服务名}` 来简化调用
            let dubboInterface = key.split(':')[0].split('.').slice(-1)[0];
            let proxy = self._service[dubboInterface] || {};
            Object.defineProperty(self._service, `I${dubboInterface}`, {
                get() {
                    let keys = Object.keys(proxy);
                    if (keys.length >= 2) {
                        console.warn('Containing the same service，Please differentiate the call');
                        return proxy;
                    }
                    return proxy[keys[0]];
                },
                enumerable: true,
                configurable: true
            });
            self._service[dubboInterface] = {
                ...proxy,
                [key]: service[key](instances[Math.floor(Math.random() * len)])
            };
        }
    }
}