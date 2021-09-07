import { CreateUploadDto } from './dto/create-upload.dto';
import { Queue } from 'bull';
export declare class UploadService {
    private uploadQueue;
    constructor(uploadQueue: Queue);
    addToQueue(file: any): Promise<void>;
    create(createUploadDto: CreateUploadDto): string;
}
