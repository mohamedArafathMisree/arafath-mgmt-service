"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.editFileName = exports.UploadModule = void 0;
const common_1 = require("@nestjs/common");
const upload_service_1 = require("./upload.service");
const upload_controller_1 = require("./upload.controller");
const platform_express_1 = require("@nestjs/platform-express");
const config_1 = require("@nestjs/config");
const bull_1 = require("@nestjs/bull");
const upload_consumer_1 = require("./upload.consumer");
const multer_1 = require("multer");
const path_1 = require("path");
let UploadModule = class UploadModule {
};
UploadModule = __decorate([
    common_1.Module({
        imports: [
            platform_express_1.MulterModule.registerAsync({
                imports: [config_1.ConfigModule],
                useFactory: async (config) => ({
                    storage: multer_1.diskStorage({
                        destination: './uploads',
                        filename: exports.editFileName,
                    }),
                }),
                inject: [config_1.ConfigService],
            }),
            bull_1.BullModule.registerQueue({
                name: 'UPLOAD_QUEUE',
                redis: {
                    host: 'localhost',
                    port: 6379,
                },
                defaultJobOptions: {
                    removeOnComplete: true,
                    removeOnFail: true,
                },
            }),
            common_1.HttpModule.registerAsync({
                imports: [config_1.ConfigModule],
                useFactory: async (configService) => ({
                    baseURL: configService.get(''),
                }),
                inject: [config_1.ConfigService],
            }),
        ],
        controllers: [upload_controller_1.UploadController],
        providers: [upload_consumer_1.UploadConsumer, upload_service_1.UploadService],
    })
], UploadModule);
exports.UploadModule = UploadModule;
const editFileName = (req, file, callback) => {
    const name = file.originalname.split('.')[0];
    const fileExtName = path_1.extname(file.originalname);
    const randomName = Array(4)
        .fill(null)
        .map(() => Math.round(Math.random() * 16).toString(16))
        .join('');
    callback(null, `${name}-${randomName}${fileExtName}`);
};
exports.editFileName = editFileName;
//# sourceMappingURL=upload.module.js.map