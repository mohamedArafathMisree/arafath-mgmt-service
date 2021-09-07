import {
  InjectQueue,
  OnQueueCompleted,
  OnQueueFailed,
  Process,
  Processor,
} from '@nestjs/bull';
import { Job, Queue } from 'bull';
import { HttpService, HttpStatus, Logger } from '@nestjs/common';
import { Student } from './entities/student.entity';
import { map } from 'rxjs/operators';
import { gql, request } from 'graphql-request';
import { } from 'socketcluster-client';
import * as SC from 'socketcluster-client';
import { ConfigService } from '@nestjs/config';
import { UserException } from './const/Exceptions';
import { CREATE_USER_QERY } from './const/queries';

const xlsxFile = require('read-excel-file/node');

@Processor('UPLOAD_QUEUE')
export class UploadConsumer {
  constructor(
    @InjectQueue('UPLOAD_QUEUE') private genieQueue: Queue,
    private readonly httpService: HttpService,
    private configService: ConfigService
  ) {

  }

  async submitToUser(students: Student[]) {

    const URL = this.configService.get('GRAPHQL_URL')
    const query = CREATE_USER_QERY

    const variables = {
      studentArray: students,
    };

    try {
      const data = await request(
        URL,
        query,
        variables,
      );
      return data
    } catch (error) {
      // console.error(JSON.stringify(error, undefined, 2));
      // return error;
      throw new UserException(40010, error, HttpStatus.NOT_IMPLEMENTED);
    }
  }

  @Process()
  async processUploadJob(job: Job) {
    let student: Student[] = [];

    const fileName = job.data.file.filename;

    try {
      await xlsxFile(`./uploads/${fileName}`).then((rows) => {
        const columnNames = rows.shift(); // Separate first row with column names
        rows.map((row) => {
          // Map the rest of the rows into objects
          const obj: any = {}; // Create object literal for current row
          row.forEach((cell, i) => {
            obj[columnNames[i]] = cell; // Use index from current cell to get column name, add current cell to new object
          });

          const stud: Student = {
            name: obj.Name,
            dob: obj.DOB,
            email: obj.Email,
            age: this.calculateAge(obj.DOB),
          };
          student.push(stud);
        });
      });
    } catch (error) {
      Logger.log('error', error);
      throw new UserException(40020, error, HttpStatus.FORBIDDEN);
    }

    if (student.length > 0) {
      let success = await this.submitToUser(student);
      return success
    }
  }

  calculateAge(birthday: Date) {
    var ageDifMs = Date.now() - birthday.getTime();
    var ageDate = new Date(ageDifMs);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  }

  @OnQueueFailed()
  async onRetryQues(job: Job, result: Error) {
  }

  @OnQueueCompleted()
  async onSubmitUser(job: Job, result: any) {

    let _result = JSON.stringify(result)
    // call done when finished
    let socket = SC.create({
      hostname: 'localhost',
      port: 8000,
    });

    (async () => {
      try {

        await socket.invokePublish(
          'fileUploadChannel',
          `Completed job with result ${_result}`,
        );
      } catch (error) {

        Logger.log(error, '--error from cluster server');
        throw new UserException(40030, error, HttpStatus.SERVICE_UNAVAILABLE);
      }
    })();
  }
}
