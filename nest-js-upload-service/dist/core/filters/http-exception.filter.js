"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpExceptionFilter = void 0;
const common_1 = require("@nestjs/common");
const app_logger_1 = require("../logger/app-logger");
let HttpExceptionFilter = class HttpExceptionFilter {
    constructor(logger) {
        this.logger = logger;
        logger.setContext('ExceptionFilter');
    }
    catch(exception, host) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const request = ctx.getRequest();
        const code = exception instanceof common_1.HttpException
            ? exception === null || exception === void 0 ? void 0 : exception.getStatus()
            : common_1.HttpStatus.INTERNAL_SERVER_ERROR;
        const message = exception instanceof common_1.HttpException
            ? exception.message
            : 'An internal server error occurred';
        this.logger.error(JSON.stringify({
            code,
            message: message,
            path: request.url,
            stack: exception.message,
            stackDetails: exception.stack,
        }));
        response.status(code).json({
            statusCode: code,
            timestamp: new Date().toISOString(),
            path: request.url,
            method: request.method,
            success: false,
            message: message,
            detail: exception.message,
            error: common_1.HttpStatus[code],
        });
    }
};
HttpExceptionFilter = __decorate([
    common_1.Catch(),
    __metadata("design:paramtypes", [app_logger_1.AppLogger])
], HttpExceptionFilter);
exports.HttpExceptionFilter = HttpExceptionFilter;
//# sourceMappingURL=http-exception.filter.js.map