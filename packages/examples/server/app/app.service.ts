import {Injectable} from '@nestjs/common';
import {AppServices} from './interfaces/appService.interface';

@Injectable()
export class AppService {
    private readonly cats: AppServices[] = [];

    create(cat: AppServices) {
        this.cats.push(cat);
    }

    async findAll(): Promise<AppServices[]> {
        return await new Promise(function(resolve) {
            setTimeout(function() {
                resolve([{name: '小咪', age: 1, breed: 'hello'}]);
            }, 2000);
        });
    }
}
