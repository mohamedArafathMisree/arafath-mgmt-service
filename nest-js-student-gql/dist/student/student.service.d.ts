import { Repository } from 'typeorm';
import { StudentCreateDTO } from './dto/create-student.input';
import { Student } from './entities/student.entity';
import { UpdateStudentInput } from './dto/update-student.input';
export declare class StudentService {
    private studentRepository;
    constructor(studentRepository: Repository<Student>);
    findAll(): Promise<Student[]>;
    findOne(id: string): Promise<Student>;
    create(studentCreateDTO: StudentCreateDTO[]): Promise<Student[]>;
    update(id: string, updateStudentInput: UpdateStudentInput): Promise<Student>;
    remove(id: string): Promise<Student>;
}
