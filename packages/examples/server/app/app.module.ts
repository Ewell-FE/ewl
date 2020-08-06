import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {AuthorityModule} from '../authority/authority.module';

@Module({
    imports:[AuthorityModule],
    controllers: [AppController],
    providers: [AppService]
})
export class AppModule {}
