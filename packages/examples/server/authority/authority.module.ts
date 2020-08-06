import {Module} from '@nestjs/common';

import {AuthorityController, } from './authority.controller';

@Module({
  imports: [],
  controllers: [AuthorityController, ]
})
export class AuthorityModule {
}
