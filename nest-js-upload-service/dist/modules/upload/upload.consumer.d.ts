import { Job, Queue } from 'bull';
import { HttpService } from '@nestjs/common';
import { Student } from './entities/student.entity';
import { ConfigService } from '@nestjs/config';
export declare class UploadConsumer {
    private genieQueue;
    private readonly httpService;
    private configService;
    constructor(genieQueue: Queue, httpService: HttpService, configService: ConfigService);
    submitToUser(students: Student[]): Promise<any>;
    processUploadJob(job: Job): Promise<any>;
    calculateAge(birthday: Date): number;
    onRetryQues(job: Job, result: Error): Promise<void>;
    onSubmitUser(job: Job, result: any): Promise<void>;
}
