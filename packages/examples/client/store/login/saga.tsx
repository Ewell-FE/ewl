import {fork, take, call} from 'redux-saga/effects';

// 初始化进入页面
function* pageInit() {
    while (true) {
        const action = yield take('DEMO_PAGE_INIT'); // 触发的aciton    变量action存dispatch触发时传的信息
        const res = yield call(patientInfo, action.params); // 调用函数,传入参数
        action.callback(res); // 用于回调
    }
}

// 获取最左侧列表
export function* patientInfo(params) {
    // 业务函数,用try...catch包裹
    /** try {
    // let patientDetail = yield call(axios.post, 'hologram/queryPatInhosVisitRec', params)   //调接口,获取结果

    let demo = {name:'张三',age:'22'}
    yield put({type: 'DEMO', result: demo});   //结果存入store
    return demo     //一般需要将结果return出去,方便生成任务函数执行回调
  }
  catch (error) {
    console.log(error);
  }**/
}

export default function*() {
    yield fork(pageInit);
}
