import {Controller, Query, Post, Req, Param, Body} from '@nestjs/common';
import {MessageHeader} from '../co/faao/plugin/transmission/request/MessageHeader';
import java from 'js-to-java';
import dubbo from '../dubbo';

@Controller('authority')
export class AuthorityController {

    @Post('checkUser')
    async login(@Body() body, @Req() req) {
        let params = JSON.stringify({
            loginToken: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1OTg5MjUzODMsInVzZXJuYW1lIjoiMjAxOTA2MjEtMzg4NiJ9.WvTu0GDar2uo1Z4YpwYa2cXMIvNLg1idxRt4sSR9SBs',
            'appId': '1001'
        });
        let result2 = await dubbo.service.IUserService.loginVerification(new MessageHeader({
            params
        }));
        return result2;
    }


    @Post('test')
    async test() {
        let params = {
            'datatype': 'json',
            'i18n': 'en-GB',
            'params': '{"messageId":"1057472937218904064","i18n":"en-GB"}',
            'nvalue': 'd'
        };
        let resi = await dubbo.service.IEchoService.echo(java.String("ok"))
        // let result = await dubbo.service.IMessageDubboService.getMessageStatusByMsgIds(new MessageHeader(params));
        // let result2 = await dubbo.service.IMetadataService.getExportedURLs();
        return resi;
    }
}