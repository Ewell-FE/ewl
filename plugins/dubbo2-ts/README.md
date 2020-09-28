# `dubbo2-ts`

> TODO: description

## Usage

```
import {nacosClient, setting} from 'dubbo2-ts';

// match 正则匹配，以及 version 是为了后期兼容老版本，自省模式从数据源中心获取版本即可
const dubboSetting = setting
    .match(/^cc.ewell.shxhyy.moe/, {
        serviceName: 'message-provider',
        version: '1.0.0'
    });


const nacos = new nacosClient({
    application: {name: 'node-nacos'},
    register: '192.168.150.42:32118',
    dubboSocketPool: 1,
    dubboInvokeTimeout: 60,
    dubboSetting
});

nacos.use(async (ctx, next) => {
    Object.assign(ctx.attachments, {
        tradeId: '链路Id'
    });
    await next(ctx);
});

export default nacos;
```
