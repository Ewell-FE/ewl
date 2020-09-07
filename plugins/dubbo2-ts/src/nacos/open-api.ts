import urllib from 'urllib';
import * as Constants from './const';

const NACOS_URL_INSTANCE = 'http://192.168.150.42:32118/nacos/v1/ns/instance/list';


/**
 * @description   查询实例列表
 */
interface IOPTIONS {
    serviceName: string;	  // 服务名
    groupName?: string;     // 分组名
    namespaceId?: string;	  // 命名空间ID
    clusters?: string;	          // 集群名称     | 多个集群用逗号分隔
    healthyOnly?: boolean;
}

export function getAllInstances(options: IOPTIONS) {
    return new Promise(function(resolve, reject) {
        urllib.request(NACOS_URL_INSTANCE, {
            method: 'GET',
            data: {
                groupName: Constants.DEFAULT_GROUP,
                healthyOnly: true,
                ...options
            }
        }, function(err, data, res) {
            if (err) {
                reject(err);
            }
            if (res.statusCode === 200) {
                resolve(data.toString());
            } else {
                reject(options.serviceName + 'request error !');
            }
        });
    });
}

