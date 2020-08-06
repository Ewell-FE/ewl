import log4js from './logger';

const initJaegerTracer = require('jaeger-client').initTracer;
const isDev = process.env.NODE_ENV === 'development';
const sysLog = log4js.getLogger('system');
const log = log4js.getLogger('console');

const config = {
    serviceName: isDev ? 'pharmacyweb-ewell-dev.ewell.cc' : process.env.JAEGERNAME,
    sampler: {
        type: 'const',
        param: 1
    },
    reporter: {
        logSpans: true,
        agentHost: isDev ? '192.168.150.73' : process.env.JAEGER_AGENT_HOST
    }
};
const options = {
    logger: {
        info: function(msg) {
            log.info(msg);
        },
        error: function logError(msg) {
            sysLog.error('ERROR', msg);
        }
    }
};
export default initJaegerTracer(config, options);
