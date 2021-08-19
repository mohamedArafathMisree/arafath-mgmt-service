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
exports.PermissionController = void 0;
const common_1 = require("@nestjs/common");
const permission_service_1 = require("./permission.service");
const create_permission_dto_1 = require("./dto/create-permission.dto");
const swagger_1 = require("@nestjs/swagger");
const simple_filter_options_dto_1 = require("../../../base/dto/simple-filter-options.dto");
let PermissionController = class PermissionController {
    constructor(permissionService) {
        this.permissionService = permissionService;
    }
    create(createPermissionDto) {
        return this.permissionService.create(createPermissionDto);
    }
    findAll(filterOptionsDto) {
        return this.permissionService.findAll(filterOptionsDto);
    }
};
__decorate([
    common_1.Post(),
    swagger_1.ApiOperation({ summary: 'Create permission' }),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_permission_dto_1.CreatePermissionDto]),
    __metadata("design:returntype", void 0)
], PermissionController.prototype, "create", null);
__decorate([
    common_1.Post('search'),
    swagger_1.ApiOperation({ summary: 'Search permissions' }),
    swagger_1.ApiBody({ type: simple_filter_options_dto_1.SimpleFilterOptionsDto }),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [simple_filter_options_dto_1.SimpleFilterOptionsDto]),
    __metadata("design:returntype", void 0)
], PermissionController.prototype, "findAll", null);
PermissionController = __decorate([
    swagger_1.ApiTags('Permission'),
    common_1.Controller('permission'),
    __metadata("design:paramtypes", [permission_service_1.PermissionService])
], PermissionController);
exports.PermissionController = PermissionController;
//# sourceMappingURL=permission.controller.js.map