import {Controller, Get, Post, Body, Param} from '@nestjs/common';

import {AppService} from './app.service';

@Controller('app')
export class AppController {
    @Post(':id')
    getOne(@Param() params: any) {
        return {
            name: `旺财${params.id}`,
            birth_year: '123',
            gender: '3454',
            skin_color: '4354',
            eye_color: '45454'
        };
    }
}
