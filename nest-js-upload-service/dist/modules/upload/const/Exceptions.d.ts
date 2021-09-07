import { HttpException } from '@nestjs/common';
export declare class UserException extends HttpException {
    constructor(errcode: number, errmsg: string, statusCode: number);
}
