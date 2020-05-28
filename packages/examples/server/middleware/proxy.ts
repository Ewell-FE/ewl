import _ from 'lodash';
import httpProxy from 'http-proxy';

export default function({env}) {
    const proxy = httpProxy.createProxyServer();
    proxy.on('error', function(err, req, res) {
        res.writeHead(500, {
            'Content-Type': 'text/plain'
        });
        res.end('Something went wrong. And we are reporting a custom error message.');
    });
    return function(req, res, next) {
        if (env === 'development') {
            if (_.startsWith(req.url, '/file-server/')) {
                proxy.web(req, res, {
                    proxyTimeout: 1000,
                    target: 'http://gridfs-infra-ewell-dev.192.168.150.42.nip.io',
                    changeOrigin: true
                });
            }
        }
        next();
    };
}
