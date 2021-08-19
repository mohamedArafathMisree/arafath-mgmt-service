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
exports.RoleService = void 0;
const common_1 = require("@nestjs/common");
const role_repository_1 = require("./repository/role.repository");
const response_dto_1 = require("../../../base/dto/response.dto");
const role_permission_repository_1 = require("../role-permission/repository/role-permission.repository");
let RoleService = class RoleService {
    constructor(roleRepository, rolePermissionRepository) {
        this.roleRepository = roleRepository;
        this.rolePermissionRepository = rolePermissionRepository;
    }
    async create(createRoleDto) {
        const newRole = this.roleRepository.create(createRoleDto);
        const data = await this.roleRepository.save(newRole);
        createRoleDto.permissions.map((permission) => {
            this.rolePermissionRepository.save({
                roleId: data.id,
                permissionId: permission,
            });
        });
        return new response_dto_1.ResponseDto(true, 'Operation Successfully.', 'This action adds a new role', {
            name: data.name,
            description: data.description,
            createdOn: data.createdOn,
        });
    }
    async filter(filterOptionsDto) {
        const paginationModelData = await this.roleRepository.findWithPagination(filterOptionsDto);
        return new response_dto_1.ResponseDto(true, 'Operation Successfully.', 'This action returns all roles', paginationModelData);
    }
};
RoleService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [role_repository_1.RoleRepository,
        role_permission_repository_1.RolePermissionRepository])
], RoleService);
exports.RoleService = RoleService;
//# sourceMappingURL=role.service.js.map