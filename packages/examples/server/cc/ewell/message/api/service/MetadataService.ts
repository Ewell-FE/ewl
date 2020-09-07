import {MessageHeader} from './../../../../../co/faao/plugin/transmission/request/MessageHeader';
import {MessageResult} from './../../../../../co/faao/plugin/transmission/response/MessageResult';
import {argumentMap} from 'interpret-util';
import {TDubboCallResult, DirectlyDubbo} from 'dubbo2-ts';
import java from 'js-to-java';

export interface IIMessageDubboService {
    getExportedURLs(serviceInterface: string, group: string): TDubboCallResult<MessageResult>;
}

export const IMessageDubboServiceWrapper = {
    getExportedURLs: argumentMap,
    serviceName: argumentMap
};

export function IMetadataService(dubbo: DirectlyDubbo): IIMessageDubboService {
    return dubbo.proxyService<IIMessageDubboService>({
        dubboInterface: 'org.apache.dubbo.metadata.MetadataService',
        version: '1.0.0',
        group:"message-provider",
        methods: IMessageDubboServiceWrapper
    });
}

//generate by interpret-cli dubbo2.js
