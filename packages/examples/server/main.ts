import {resolve} from 'path';

import {AppModule} from './app/app.module';
import {Startup} from './startup';

(async () =>
    new Startup({
        module: AppModule
    }).main())().catch(e => {
    console.error(e);
    process.exit(1);
});
