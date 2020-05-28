import _ from 'lodash';

export default async function(ctx) {
    const reducers = {};
    const sagas = {};
    // 解析地址栏url寻依赖模块
    try {
        const reducer = await import(`~/client/store${ctx.pathname}/reducer`);
        const saga = await import(`~/client/store${ctx.pathname}/saga`);
        if (reducer) {
            Object.assign(reducers, {
                [_.camelCase(ctx.pathname)]: reducer.default
            });
        }
        if (saga) {
            Object.assign(sagas, {
                [_.camelCase(ctx.pathname)]: saga.default
            });
        }
    } catch (e) {
        console.warn(e);
    }
    return {
        sagas,
        reducers
    };
}
