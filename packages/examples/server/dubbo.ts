import {nacosClient, setting} from 'dubbo2-ts';

// import authorityDirectlydubbo from './authority/Directlydubbo';
const dubboSetting = setting
    .match(/^cc.ewell.shxhyy.moe/, {
        serviceName: 'message-provider',
        version: '1.0.0'
    });


const nacos = new nacosClient({
    application: {name: 'node-nacos'},
    register: '192.168.150.55:32118',
    dubboSocketPool: 1,
    dubboInvokeTimeout: 60,
    dubboSetting
});

nacos.use(async (ctx, next) => {
    Object.assign(ctx.attachments, {
        tradeId: '000000999999'
    });
    await next(ctx);
});

export default nacos;