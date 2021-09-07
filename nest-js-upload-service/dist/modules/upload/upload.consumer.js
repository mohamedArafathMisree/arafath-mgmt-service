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
exports.UploadConsumer = void 0;
const bull_1 = require("@nestjs/bull");
const common_1 = require("@nestjs/common");
const graphql_request_1 = require("graphql-request");
const SC = require("socketcluster-client");
const config_1 = require("@nestjs/config");
const Exceptions_1 = require("./const/Exceptions");
const queries_1 = require("./const/queries");
const xlsxFile = require('read-excel-file/node');
let UploadConsumer = class UploadConsumer {
    constructor(genieQueue, httpService, configService) {
        this.genieQueue = genieQueue;
        this.httpService = httpService;
        this.configService = configService;
    }
    async submitToUser(students) {
        const URL = this.configService.get('GRAPHQL_URL');
        const query = queries_1.CREATE_USER_QERY;
        const variables = {
            studentArray: students,
        };
        try {
            const data = await graphql_request_1.request(URL, query, variables);
            return data;
        }
        catch (error) {
            throw new Exceptions_1.UserException(40010, error, common_1.HttpStatus.NOT_IMPLEMENTED);
        }
    }
    async processUploadJob(job) {
        let student = [];
        const fileName = job.data.file.filename;
        try {
            await xlsxFile(`./uploads/${fileName}`).then((rows) => {
                const columnNames = rows.shift();
                rows.map((row) => {
                    const obj = {};
                    row.forEach((cell, i) => {
                        obj[columnNames[i]] = cell;
                    });
                    const stud = {
                        name: obj.Name,
                        dob: obj.DOB,
                        email: obj.Email,
                        age: this.calculateAge(obj.DOB),
                    };
                    student.push(stud);
                });
            });
        }
        catch (error) {
            common_1.Logger.log('error', error);
            throw new Exceptions_1.UserException(40020, error, common_1.HttpStatus.FORBIDDEN);
        }
        if (student.length > 0) {
            let success = await this.submitToUser(student);
            return success;
        }
    }
    calculateAge(birthday) {
        var ageDifMs = Date.now() - birthday.getTime();
        var ageDate = new Date(ageDifMs);
        return Math.abs(ageDate.getUTCFullYear() - 1970);
    }
    async onRetryQues(job, result) {
        console.log('queFailed', Error);
    }
    async onSubmitUser(job, result) {
        let _result = JSON.stringify(result);
        let socket = SC.create({
            hostname: 'localhost',
            port: 8000,
        });
        (async () => {
            try {
                await socket.invokePublish('fileUploadChannel', `Completed job with result ${_result}`);
                console.log(_result);
            }
            catch (error) {
                common_1.Logger.log(error, '--error from cluster server');
                throw new Exceptions_1.UserException(40030, error, common_1.HttpStatus.SERVICE_UNAVAILABLE);
            }
        })();
        console.log(`Completed job with result ${_result}`);
        console.log('processUploadJob' + job.data.file);
    }
};
__decorate([
    bull_1.Process(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UploadConsumer.prototype, "processUploadJob", null);
__decorate([
    bull_1.OnQueueFailed(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Error]),
    __metadata("design:returntype", Promise)
], UploadConsumer.prototype, "onRetryQues", null);
__decorate([
    bull_1.OnQueueCompleted(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UploadConsumer.prototype, "onSubmitUser", null);
UploadConsumer = __decorate([
    bull_1.Processor('UPLOAD_QUEUE'),
    __param(0, bull_1.InjectQueue('UPLOAD_QUEUE')),
    __metadata("design:paramtypes", [Object, common_1.HttpService,
        config_1.ConfigService])
], UploadConsumer);
exports.UploadConsumer = UploadConsumer;
//# sourceMappingURL=upload.consumer.js.map