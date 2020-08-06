import {Controller, Query, Post, Req, Param, Body} from '@nestjs/common';
import {MessageHeader} from '../co/faao/plugin/transmission/request/MessageHeader';

import dubbo from '../dubbo';

@Controller('authority')
export class AuthorityController {
    @Post('loginVerification')
    async loginVerification() {

        let params = JSON.stringify({
            loginToken: '234234',
            'appId': '1001'
        });
        let result = await dubbo.service.IUserService.loginVerification(new MessageHeader({
            params
        }));
        return result;
    }
}


