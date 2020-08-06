import appReducer from './app/reducer';

import dictReducer from './dict/reducer';

import authReducer from './authority/reducer';

import DemoReducer from './demo/reducer';

export default function(ctx, initialState: any) {
    const reducers = {
        appReducer,
        dictReducer,
        authReducer,
        DemoReducer
    };
    if (ctx.isServer && initialState === null) {
        initialState = {};
        // 注入权限
        if (ctx.req.uuheader) {
            initialState.authReducer = {uuheader: ctx.req.uuheader || {}};
        }
        // 注入apollo
        initialState.appReducer = {apollo: ctx.req.apollo, router: {}};
    }
    // 解析请求url寻依赖模块
    if (ctx.reducer && ctx.sagas) {
        Object.assign(reducers, ctx.reducer);
    }
    return {
        ctx,
        initialState,
        reducers
    };
}
