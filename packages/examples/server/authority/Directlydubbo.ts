import {DirectlyDubbo} from 'dubbo2-ts';
import service from './service';

// const registerAddress: string = '192.168.150.42:31577'; //feature
const registerAddress: string = '192.168.150.42:30173'; //开发
// const registerAddress: string = '192.168.198.94:31930';  //3.0测试地址

const dubbo = DirectlyDubbo.from({
    dubboAddress: registerAddress,
    dubboVersion: '3.0.0',
    dubboInvokeTimeout: 6
});
let DirectlyService: {
    [methodName: string]: Function;
} = {};
Object.keys(service).forEach(function(key) {
    DirectlyService[key] = service[key](dubbo);
});

export default <any>DirectlyService;
