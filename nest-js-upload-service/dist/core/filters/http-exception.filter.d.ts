import { ArgumentsHost, ExceptionFilter, HttpException } from '@nestjs/common';
import { AppLogger } from '../logger/app-logger';
export declare class HttpExceptionFilter implements ExceptionFilter {
    private readonly logger;
    constructor(logger: AppLogger);
    catch(exception: HttpException, host: ArgumentsHost): any;
}
