import {fork, put, take, call, all, takeEvery, throttle, select} from 'redux-saga/effects';
import * as axios from '../../util/axios';
import _ from 'lodash';
// 初始化进入页面
function* pageInit() {
    while (true) {
        const obj = yield take('PAGE_INIT');
        if (obj.user) {
            yield put({type: 'AUTHORITY_USER_INFO_GET_D', result: obj.user});
        }
        // let userInfo = yield select((store:any) => (store.authReducer && store.hologramReducer.userInfo.object) || {})
        const userInfo = yield select((store: any) => _.get(store, 'authReducer.uuheader.object', {}));
        // let userInfo = _.get(this.props,'authReducer.uuheader',{})
        const treeParam = {
            token: userInfo.loginToken,
            deviceType: 'pc',
            dimenCode: 'Dept'
        };

        yield all([call(getTreeList, treeParam)]);
        obj.callback();
    }
}

// 获取菜单
export function* getTreeList(params) {
    try {
        const menuList = yield call(axios.post, 'authority/getTreeList', {
            ...params,
            appId: '1006',
            dimenCode: 'Dept'
        });
        // 将数组过滤  提取出含有appList的

        yield put({type: 'MODULE_MENU_LIST', appList: menuList.object});
    } catch (error) {
        console.log(error);
    }
}

export default function*() {
    yield fork(pageInit);
}
