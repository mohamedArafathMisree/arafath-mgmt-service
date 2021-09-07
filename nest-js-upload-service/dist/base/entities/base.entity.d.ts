import { BaseEntity } from 'typeorm';
export declare class Base extends BaseEntity {
    createdBy: string;
    updatedBy: string;
    createdOn: Date;
    updatedOn: Date;
    deletedOn: Date;
    isActive: boolean;
}
