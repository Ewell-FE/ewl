import {IsString, IsInt} from 'class-validator';
import {ApiProperty} from '@nestjs/swagger';

export class IMessageHeader {
    @ApiProperty()
    @IsString()
    datatype: string;

    @ApiProperty({example: '{}'})
    @IsString()
    params: string;

    @ApiProperty()
    @IsString()
    uuheader: string;

    @ApiProperty()
    @IsString()
    i18n: string;
}
