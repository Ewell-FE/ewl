import {DirectlyDubbo} from 'dubbo2-ts';
import service from './service';

// const registerAddress: string = '192.168.150.42:31577'; //feature
const registerAddress: string = '192.168.150.55:20882'; //开发
const registerAddress2: string = '192.168.150.42:30173'; //权限   3.0.0
// const registerAddress: string = '192.168.198.94:31930';  //3.0测试地址

const dubbo = DirectlyDubbo.from({
    dubboAddress: registerAddress,
    dubboVersion: '1.0.0',
    dubboInvokeTimeout: 20
});
let DirectlyService: {
    [methodName: string]: Function;
} = {};
Object.keys(service).forEach(function(key) {
    DirectlyService[key] = service[key](dubbo);
});

export default <any>DirectlyService;
