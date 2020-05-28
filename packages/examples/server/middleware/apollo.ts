import apollo from 'node-apollo';

export default async function({appId}) {
    const config = {
        configServerUrl:
            process.env.NODE_ENV === 'development' ? 'http://192.168.150.42:32473' : process.env.apollometa,
        appId: appId,
        clusterName: 'default',
        namespaceName: ['application']
    };
    const apolloResult = await apollo.remoteConfigServiceSkipCache(config);
    return function(req, res, next) {
        req.apollo = apolloResult;
        next();
    };
}
