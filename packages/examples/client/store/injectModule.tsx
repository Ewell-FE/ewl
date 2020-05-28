// 只有在单页切换时动态注入
import clientAsyncModule from '~/client/store/clientAsyncModule';

export default async function injectModule(ctx) {
    if (!ctx.isServer) {
        const {reducers, sagas} = await clientAsyncModule(ctx);
        ctx.store.injectAsynReducer(reducers);
        await ctx.store.injectAsyncSaga(sagas);
    }
}
