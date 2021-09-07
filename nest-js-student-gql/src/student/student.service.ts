import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StudentCreateDTO } from './dto/create-student.input';
import { Student } from './entities/student.entity';
import { UpdateStudentInput } from './dto/update-student.input';
import { request, gql } from 'graphql-request';
import { v4 as uuidv4 } from 'uuid';
import { CREATE_STUDENT_QERY } from './const/queries';
import { uuid } from "uuidv4";
import { Logger } from '@nestjs/common';
import { UserException } from './const/Exceptions';
import { ConfigService } from '@nestjs/config';



@Injectable()
export class StudentService {

  constructor(
    @InjectRepository(Student)
    private studentRepository: Repository<Student>,
    private configService: ConfigService
  ) { }

  async findAll(): Promise<Student[]> {
    return this.studentRepository.find();
  }

  async findOne(id: string) {
    return this.studentRepository.findOne(id);
  }

  async create(studentCreateDTO: StudentCreateDTO[]): Promise<Student[]> {
    const graphqlURL = this.configService.get('GRAPHQL_URL')
    const variables = {
      createStudentsArray: studentCreateDTO,
    };

    variables.createStudentsArray.map((obj) => (obj["id"] = uuid()));

    const query = CREATE_STUDENT_QERY

    try {
      const data = await request(
        graphqlURL, // remove url
        query,
        variables
      );

      // data.createStudents.students
      return data.createStudents.students;
    } catch (error) {
      Logger.log("error on save", error);
      // return error;
      throw new UserException(40010, error, HttpStatus.NOT_IMPLEMENTED);

    }
  }

  update(id: string, updateStudentInput: UpdateStudentInput) {
    const student: Student = this.studentRepository.create(updateStudentInput);
    student.id = id;
    return this.studentRepository.save(student);
  }

  async remove(id: string) {
    const student = this.findOne(id);
    if (student) {
      const ret = await this.studentRepository.delete(id);
      if (ret.affected === 1) {
        return student;
      }
    }
    throw new NotFoundException(`Record cannot find by id ${id}`);
  }
}