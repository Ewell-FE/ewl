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
        let methods = Object.create(null);
        methodsString.split(',').forEach((name) => {
            methods[name] = argumentMap;
        });
        return methods;
    }

    create() {
        let serviceInterface = Object.create(null);
        this.MetadataArray.forEach((MetadataUrl) => {
            let Metadata = querystring.parse(MetadataUrl);
            let interfaceName = Metadata.interface.split('.').slice(-1)[0];
            serviceInterface[interfaceName] = (dubbo: DirectlyDubbo): IInterfaceService => {
                return dubbo.proxyService<IInterfaceService>({
                    dubboInterface: Metadata.interface,
                    version: Metadata.version,
                    group: Metadata.group,
                    methods: this.formatMethods(Metadata.methods)
                });
            };
        });
        return serviceInterface;
    }

}