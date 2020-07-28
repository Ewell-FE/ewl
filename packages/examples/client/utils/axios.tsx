import axios from 'axios';
import _ from 'lodash';

var instance = axios.create({
    timeout: 60000,
    headers: {
        'Content-Type': 'application/json'
    },
    validateStatus: function(status) {
        if (status >= 200 && status <= 300) {
            return true;
        } else if (status === 401) {
            console.error('权限校验失败！');
        }
        return false;
    }
});
instance.interceptors.response.use((result) => {
    return result.data;
}, (thrown) => {
    if (axios.isCancel(thrown)) {
        return Promise.reject('请求被阻断');
    }
    return Promise.reject(thrown);
});


export const post = function(url, opts = {}, obj = {}) {
    opts = _.omit(opts, ['user', 'dataType', 'language']);

    return instance.post(url, {
        datatype: 'json',
        i18n: 'zh',
        params: JSON.stringify(opts),
        userInfo: {
            object: {}
        }
    }, obj);
};

export const CancelToken = axios.CancelToken;
