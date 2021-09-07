import { Repository } from 'typeorm';
import { StudentCreateDTO } from './dto/create-student.input';
import { Student } from './entities/student.entity';
import { UpdateStudentInput } from './dto/update-student.input';
import { ConfigService } from '@nestjs/config';
export declare class StudentService {
    private studentRepository;
    private configService;
    constructor(studentRepository: Repository<Student>, configService: ConfigService);
    findAll(): Promise<Student[]>;
    findOne(id: string): Promise<Student>;
    create(studentCreateDTO: StudentCreateDTO[]): Promise<Student[]>;
    update(id: string, updateStudentInput: UpdateStudentInput): Promise<Student>;
    remove(id: string): Promise<Student>;
}
