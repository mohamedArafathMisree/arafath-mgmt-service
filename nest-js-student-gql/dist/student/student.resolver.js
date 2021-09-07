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
exports.StudentResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const create_student_input_1 = require("./dto/create-student.input");
const student_service_1 = require("./student.service");
const student_entity_1 = require("./entities/student.entity");
const update_student_input_1 = require("./dto/update-student.input");
let StudentResolver = class StudentResolver {
    constructor(employeeService) {
        this.employeeService = employeeService;
    }
    findAll() {
        return this.employeeService.findAll();
    }
    create(studentCreateDTO) {
        return this.employeeService.create(studentCreateDTO);
    }
    findOne(id) {
        return this.employeeService.findOne(id);
    }
    updateStudent(updateStudentInput) {
        return this.employeeService.update(updateStudentInput.id, updateStudentInput);
    }
    removeStudent(id) {
        return this.employeeService.remove(id);
    }
};
__decorate([
    graphql_1.Query(() => [student_entity_1.Student], { name: 'getAllStudents' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], StudentResolver.prototype, "findAll", null);
__decorate([
    graphql_1.Mutation(() => [student_entity_1.Student], { name: 'createStudent' }),
    __param(0, graphql_1.Args({ name: 'studentInput', type: () => [create_student_input_1.StudentCreateDTO] })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", void 0)
], StudentResolver.prototype, "create", null);
__decorate([
    graphql_1.Query(() => student_entity_1.Student),
    __param(0, graphql_1.Args('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], StudentResolver.prototype, "findOne", null);
__decorate([
    graphql_1.Mutation(() => student_entity_1.Student),
    __param(0, graphql_1.Args('studentInput')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_student_input_1.UpdateStudentInput]),
    __metadata("design:returntype", void 0)
], StudentResolver.prototype, "updateStudent", null);
__decorate([
    graphql_1.Mutation(() => student_entity_1.Student),
    __param(0, graphql_1.Args('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], StudentResolver.prototype, "removeStudent", null);
StudentResolver = __decorate([
    graphql_1.Resolver(() => student_entity_1.Student),
    __metadata("design:paramtypes", [student_service_1.StudentService])
], StudentResolver);
exports.StudentResolver = StudentResolver;
//# sourceMappingURL=student.resolver.js.map