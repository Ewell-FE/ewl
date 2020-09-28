import _ from 'lodash';
import {parse} from 'url';
import log4js from '../config/logger';

const logger = log4js.getLogger();

export default function(handle, port) {
    return function(req, res, next) {
        if (req.method.toUpperCase() === 'GET') {
            if (
                _.startsWith(req.url, '/login') ||
                _.startsWith(req.url, '/_next') ||
                _.startsWith(req.url, '/static')
            ) {
                handle(req, res, parse(req.url, true));
            } else {
                req.uuheader = {
                    userName: 'lilei',
                    userRole: '超级管理员',
                    qq: '313884212'
                };
                handle(req, res, parse(req.url, true));
            }
        } else {
            next();
        }
    };
}
