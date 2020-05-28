import axios from 'axios';
import getStore from '../store/createStore';
import _ from 'lodash';

const pkage = require('../../package.json');

const isDev = process.env.NODE_ENV === 'development';
const isBrower = (global as any).document;
const instance = axios.create({
    baseURL: isDev ? 'http://localhost:3002/api' : isBrower ? pkage.baseURL : 'http://pharmacyweb-emr-ewell:8080/api',
    timeout: 60000,
    headers: {
        'Content-Type': 'application/json'
    },
    validateStatus: function(status) {
        if (status >= 200 && status <= 300) {
            return true;
        } else if (status === 401) {
            console.error('权限校验失败！');
            window.location.href = pkage.loginPage;
        }
        return false;
    }
});
instance.interceptors.response.use(
    result => {
        if (result.data.status === 0) {
            console.info('axios', result.data.message);
        }
        return result.data;
    },
    thrown => {
        if (axios.isCancel(thrown)) {
            return Promise.reject('请求被阻断');
        }
        return Promise.reject(thrown);
    }
);

export const post = function(url, opts = {}, obj = {}) {
    const store = getStore && getStore();
    const userInfo = _.get(store.getState(), 'authReducer.uuheader.object', {});
    const activedeptcode = _.get(
        _.find(_.get(userInfo, 'areaTypeList', []), {areaTypeCode: 'DEPT_DICT'}),
        'areaList[0].areaCode'
    );
    // console.log('asdf')
    // console.log(activedeptcode)
    // console.log(obj)
    // console.log(userInfo)
    const uuheader = JSON.parse(JSON.stringify(userInfo));
    uuheader.activeDeptCode = activedeptcode;
    return instance.post(
        url,
        {
            datatype: 'json',
            i18n: 'zh',
            params: JSON.stringify(opts),
            uuheader: JSON.stringify(uuheader),
            userInfo: {},
            ...opts
        },
        obj
    );
};

export const CancelToken = axios.CancelToken;
