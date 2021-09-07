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
const queries_1 = require("./const/queries");
const uuidv4_1 = require("uuidv4");
const common_2 = require("@nestjs/common");
const Exceptions_1 = require("./const/Exceptions");
const config_1 = require("@nestjs/config");
let StudentService = class StudentService {
    constructor(studentRepository, configService) {
        this.studentRepository = studentRepository;
        this.configService = configService;
    }
    async findAll() {
        return this.studentRepository.find();
    }
    async findOne(id) {
        return this.studentRepository.findOne(id);
    }
    async create(studentCreateDTO) {
        const variables = {
            createStudentsArray: studentCreateDTO,
        };
        variables.createStudentsArray.map((obj) => (obj["id"] = uuidv4_1.uuid()));
        const query = queries_1.CREATE_STUDENT_QERY;
        try {
            const data = await graphql_request_1.request("http://localhost:5000/graphql", query, variables);
            console.log("this magic data", data.createStudents.students);
            return data.createStudents.students;
        }
        catch (error) {
            common_2.Logger.log("error on save", error);
            throw new Exceptions_1.UserException(40010, error, common_1.HttpStatus.NOT_IMPLEMENTED);
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
    __metadata("design:paramtypes", [typeorm_2.Repository,
        config_1.ConfigService])
], StudentService);
exports.StudentService = StudentService;
//# sourceMappingURL=student.service.js.map