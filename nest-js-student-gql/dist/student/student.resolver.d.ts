import { StudentCreateDTO } from './dto/create-student.input';
import { StudentService } from './student.service';
import { Student } from './entities/student.entity';
import { UpdateStudentInput } from './dto/update-student.input';
export declare class StudentResolver {
    private employeeService;
    constructor(employeeService: StudentService);
    findAll(): Promise<Student[]>;
    create(studentCreateDTO: StudentCreateDTO[]): Promise<Student[]>;
    findOne(id: string): Promise<Student>;
    updateStudent(updateStudentInput: UpdateStudentInput): Promise<Student>;
    removeStudent(id: string): Promise<Student>;
}
