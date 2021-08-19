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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const user_repository_1 = require("./repository/user.repository");
const response_dto_1 = require("../../../base/dto/response.dto");
const role_user_repository_1 = require("../role-user/repository/role-user.repository");
let UserService = class UserService {
    constructor(userRepository, roleUserRepository) {
        this.userRepository = userRepository;
        this.roleUserRepository = roleUserRepository;
    }
    async create(createUserDto) {
        const newUser = this.userRepository.create(createUserDto);
        const data = await this.userRepository.save(newUser);
        createUserDto.roles.map((role) => {
            this.roleUserRepository.save({
                userId: data.id,
                roleId: role,
            });
        });
        return new response_dto_1.ResponseDto(true, 'Operation Successfully.', 'This action adds a new user', null);
    }
    async filter(filterOptionsDto) {
        const paginationModelData = await this.userRepository.findWithPagination(filterOptionsDto);
        return new response_dto_1.ResponseDto(true, 'Operation Successfully.', 'This action returns all users', paginationModelData);
    }
    async findOne(username) {
        return await this.userRepository.findOne({
            userName: username,
        });
    }
};
UserService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [user_repository_1.UserRepository,
        role_user_repository_1.RoleUserRepository])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map