"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudentService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const student_entity_1 = require("./entities/student.entity");
const graphql_request_1 = require("graphql-request");
let StudentService = class StudentService {
    constructor(studentRepository) {
        this.studentRepository = studentRepository;
    }
    async findAll() {
        return this.studentRepository.find();
    }
    async findOne(id) {
        return this.studentRepository.findOne(id);
    }
    async create(studentCreateDTO) {
        console.log('DTO', studentCreateDTO);
        const variables = {
            createStudentsArray: studentCreateDTO,
        };
        const query = graphql_request_1.gql `
      mutation createStudents($createStudentsArray:  [StudentInput]!) {
        createStudents(input: { createMultiple: $createStudentsArray }) {
          __typename
        }
      }
    `;
        try {
            const data = await graphql_request_1.request('http://localhost:5000/graphql', query, variables);
            console.log('this magic', data);
            return data;
        }
        catch (error) {
            console.error(error);
            return error;
        }
    }
    update(id, updateStudentInput) {
        const student = this.studentRepository.create(updateStudentInput);
        student.id = id;
        return this.studentRepository.save(student);
    }
    async remove(id) {
        const student = this.findOne(id);
        if (student) {
            const ret = await this.studentRepository.delete(id);
            if (ret.affected === 1) {
                return student;
            }
        }
        throw new common_1.NotFoundException(`Record cannot find by id ${id}`);
    }
};
StudentService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(student_entity_1.Student)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], StudentService);
exports.StudentService = StudentService;
//# sourceMappingURL=student.service.js.map