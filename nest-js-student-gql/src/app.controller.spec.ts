import { Test, TestingModule } from '@nestjs/testing';
import { StudentResolver } from './student/student.resolver';
import { StudentService } from './student/student.service';

describe('AppController', () => {
  let appController: StudentResolver;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [StudentResolver],
      providers: [StudentService],
    }).compile();

    appController = app.get<StudentResolver>(StudentResolver);
  });

  describe('root', () => {

  });
});
