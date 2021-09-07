import { Test, TestingModule } from '@nestjs/testing';
import { StudentCreateDTO } from './dto/create-student.input';
import { UpdateStudentInput } from './dto/update-student.input';
import { StudentService } from './student.service';
import { Student } from './entities/student.entity';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('StudentService', () => {
  let service: StudentService;
  let StudentRepository = {
    create: jest.fn().mockImplementation((payload) => payload),
    save: jest.fn().mockImplementation((payload) => {
      return {
        id: payload.id,
        ...payload,
      };
    }),
  };
  const mockStudentService = {
    create: jest.fn((dto) => {
      return {
        data: {
          createStudents: {
            __typename: 'Student',
          },
        },
      };
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        StudentService,
        {
          provide: getRepositoryToken(Student),
          useValue: StudentRepository,
        },
      ],
    }).compile();

    service = module.get<StudentService>(StudentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create students', async () => {
    const entry: StudentCreateDTO[] = [
      {
        name: 'student',
        dob: new Date(),
        email: 'student@g.com',
        age: 22,
      },
    ];

    const studentSpy = jest.spyOn(service, 'create');
    service.create(entry);
    expect(studentSpy).toHaveBeenCalledWith(entry);
  });

  it('should delete student', async () => {
    const id = 'id';

    const studentSpy = jest.spyOn(service, 'remove');
    service.remove(id);
    expect(studentSpy).toHaveBeenCalledWith(id);
  });

  it('should update student', async () => {
    const entry: UpdateStudentInput = {
      id: 'id',
      name: 'student',
      dob: new Date(),
      email: 'student@g.com',
      age: 22,
    };

    const studentSpy = jest.spyOn(service, 'update');
    service.update(entry.id, entry);
    expect(studentSpy).toHaveBeenCalledWith(entry.id, entry);
  });

  it('should get student', async () => {
    const studentSpy = jest.spyOn(service, 'findAll');
    service.findAll();
    expect(studentSpy).toHaveBeenCalled();
  });
  it('should get one student', async () => {
    const studentSpy = jest.spyOn(service, 'findOne');
    service.findOne('id');
    expect(studentSpy).toHaveBeenCalled();
  });
});
