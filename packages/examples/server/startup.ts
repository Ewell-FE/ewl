import {INestApplication} from '@nestjs/common';
import {NestFactory} from '@nestjs/core';
import express from 'express';
import favicon from 'serve-favicon';
import * as http from 'http';
import * as path from 'path';
import next from 'next';
import {URL, parse} from 'url';
import {resolve} from 'path';

import {DocumentBuilder, SwaggerModule} from '@nestjs/swagger';
import {ExpressAdapter} from '@nestjs/platform-express';
import {AbstractHttpAdapter} from '@nestjs/core/adapters/http-adapter';
import tracer from './config/jaegerTrace';
import auth from './middleware/auth';
import health from './middleware/health';
import proxy from './middleware/proxy';
import apollo from './middleware/apollo';
import * as opentracing from 'opentracing';
import docs from 'dubbo2-ts-docs';
import dubbo from './dubbo';
import {DirectlyDubbo} from 'dubbo2-ts';
import zone from 'zone-context';

export class Startup {
    private readonly env = process.env.NODE_ENV || 'development';
    private readonly port = process.env.PORT || '3002';
    private readonly app: any;
    private readonly server: AbstractHttpAdapter;
    private readonly handle: (req: http.IncomingMessage, res: http.ServerResponse, parsedUrl?: any) => Promise<void>;

    constructor(private readonly config: StartupConfiguration) {
        const nextConfig = {
            dev: this.env !== 'production',
            dir: resolve('.', 'client'),
            conf: require(resolve('.', 'next.config.js'))
        };
        this.app = next(nextConfig);
        this.handle = this.app.getRequestHandler();
        this.server = new ExpressAdapter(express());
    }

    async main() {
        try {
            const handle = this.handle;
            const app = await this.configureNest();

            // 开发环境本地代理配置
            this.server.use(proxy({env: this.env}));

            // 阿波罗配置
            // this.server.use(await apollo({appId: 'xh-medrec'}));

            // favicon.ico 拦截
            this.server.use(favicon(path.resolve(process.cwd(), 'client/static/favicon.ico')));

            // 健康检查必须在权限上面
            this.server.use(health('/api/app/health'));

            //dubbo服务的接口文档
            // this.server.get('/docs', docs(dubbo.api));

            this.server.get('/jiankong', function(req, res, next) {
                let result = Object.keys(dubbo.instances).map(function(key) {
                    let instance = dubbo.instances[key];
                    let json = {};
                    let type = {
                        'metadataInstances': '源数据服务',
                        'instances': '微服务'
                    }[key];
                    instance.forEach(function(value, key, map) {
                        let revision = key.split(':')[1];
                        let serviceName = key.split(':')[2];
                        let provider = Array.isArray(value) ? value : [value];
                        json[key] = provider.map(function(worker: DirectlyDubbo) {
                            return {
                                type: type,
                                serviceName: serviceName,
                                revision: revision,
                                agentsStatus: worker.socketWorker.map(function(item) {
                                    return {
                                        'PADDING': '初始化',
                                        'RETRY': '重连中',
                                        'CONNECTED': '在线',
                                        'CLOSED': '下线'
                                    }[item.status];
                                })
                            };
                        });
                    });
                    return json;
                });

                res.json(result);
            });

            // 权限中间件
            this.server.use(auth(handle, this.port));

            this.server.post(/^(\/api)/, (req, res, next) => {
                let referer = req.headers.referer || 'http://localhost:3002';
                let url = new URL(referer);
                const span = tracer.startSpan(req.url, {
                    tags: {
                        referer: url.origin + url.pathname,
                        url: req.url
                    }
                });
                let carrier = {};
                tracer.inject(span.context(), opentracing.FORMAT_TEXT_MAP, carrier);
                zone.setRootContext('tradeId', carrier);
                req.tradeSpan = span;
                next();
            });
            await this.app.prepare();
            await app.listen(this.port);
            console.log('http://localhost:' + this.port);
        } catch (e) {
            console.log('error');
            console.error(e);
            process.exit(1);
        }
    }

    private async configureNest() {
        this.server.use(express.json({limit: '50mb'}));
        const app: INestApplication = await NestFactory.create(this.config.module, this.server, {
            bodyParser: true,
            cors: true
        });
        app.setGlobalPrefix('api');
        const options = new DocumentBuilder()
            .setTitle('企业级前端微服务框架')
            .setDescription('swagger api')
            .setVersion('1.0')
            .addTag('入口服务')
            .build();
        const document = SwaggerModule.createDocument(app, options);
        SwaggerModule.setup('swagger', app, document);

        return app;
    }

    private async configureNext() {
        await this.app.prepare();
    }
}

export interface StartupConfiguration {
    module: any;
}
