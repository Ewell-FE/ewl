import {DirectlyDubbo} from '../../consumer/directly-dubbo';
import {argumentMap} from 'interpret-util';

const querystring = require('querystring');

interface IInterfaceService {
    [key: string]: () => any
}

export class classFactory {

    private MetadataArray: Array<string> = [];

    constructor(MetadataService) {
        this.MetadataArray = MetadataService;
    }

    formatMethods(methodsString) {
        let methods = Object.create({});
        methodsString.split(',').forEach((name) => {
            methods[name] = argumentMap;
        });
        return methods;
    }


    create() {
        let serviceInterface = Object.create({});
        this.MetadataArray.forEach((MetadataUrl) => {
            let Metadata = querystring.parse(MetadataUrl);
            let group = Metadata.group || ""
            serviceInterface[`${Metadata.interface}:${Metadata.version}:${group}`] = (dubbo: DirectlyDubbo): IInterfaceService => {
                return dubbo.proxyService<IInterfaceService>({
                    dubboInterface: Metadata.interface,
                    version: Metadata.version,
                    group: group,
                    methods: this.formatMethods(Metadata.methods)
                });
            };
        });
        return serviceInterface;
    }

}