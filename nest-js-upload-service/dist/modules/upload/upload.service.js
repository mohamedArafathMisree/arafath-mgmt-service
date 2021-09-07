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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UploadService = void 0;
const common_1 = require("@nestjs/common");
const bull_1 = require("@nestjs/bull");
let UploadService = class UploadService {
    constructor(uploadQueue) {
        this.uploadQueue = uploadQueue;
    }
    async addToQueue(file) {
        await this.uploadQueue.add({
            file: file,
        });
    }
    create(createUploadDto) {
        return 'This action adds a new upload';
    }
};
UploadService = __decorate([
    common_1.Injectable(),
    __param(0, bull_1.InjectQueue('UPLOAD_QUEUE')),
    __metadata("design:paramtypes", [Object])
], UploadService);
exports.UploadService = UploadService;
//# sourceMappingURL=upload.service.js.map