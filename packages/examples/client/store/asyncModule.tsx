/*
 * 首次刷新页面根据url注入依赖的reducer 和 saga
 * */
import mount from './mount';

export default function asyncModule(context, State?: any) {
    // todo: 在此处挂载各种信息
    const {initialState, reducers} = mount(context, State);
    return {
        reducers,
        initialState
    };
}
