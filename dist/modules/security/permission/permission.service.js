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
exports.PermissionService = void 0;
const common_1 = require("@nestjs/common");
const permission_repository_1 = require("./repository/permission.repository");
const response_dto_1 = require("../../../base/dto/response.dto");
const simple_pagination_results_dto_1 = require("../../../base/dto/simple-pagination-results.dto");
let PermissionService = class PermissionService {
    constructor(permissionRepository) {
        this.permissionRepository = permissionRepository;
    }
    async create(createPermissionDto) {
        const newPermission = this.permissionRepository.create(createPermissionDto);
        const data = await this.permissionRepository.save(newPermission);
        return new response_dto_1.ResponseDto(true, 'Operation Successfully.', 'This action adds a new permission', {
            name: data.name,
            description: data.description,
            createdOn: data.createdOn,
        });
    }
    async findAll(filterOptionsDto) {
        const items = await this.permissionRepository.find({
            select: filterOptionsDto.selects,
            relations: filterOptionsDto.relations,
            where: filterOptionsDto.where,
            order: filterOptionsDto.order,
            withDeleted: filterOptionsDto.withDeleted,
            skip: filterOptionsDto.skip,
            take: filterOptionsDto.take,
        });
        const totalItems = await this.permissionRepository.count();
        return new response_dto_1.ResponseDto(true, 'Operation Successfully.', 'This action returns all permissions', new simple_pagination_results_dto_1.SimplePaginationResultsDto(totalItems, items, filterOptionsDto));
    }
};
PermissionService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [permission_repository_1.PermissionRepository])
], PermissionService);
exports.PermissionService = PermissionService;
//# sourceMappingURL=permission.service.js.map