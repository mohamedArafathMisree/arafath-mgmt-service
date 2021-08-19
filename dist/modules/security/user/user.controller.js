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
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("./user.service");
const create_user_dto_1 = require("./dto/create-user.dto");
const swagger_1 = require("@nestjs/swagger");
const roles_decorator_1 = require("../../../core/decorator/roles.decorator");
const permissions_decorator_1 = require("../../../core/decorator/permissions.decorator");
const filter_options_dto_1 = require("../../../base/filter/dtos/filter-options.dto");
let UserController = class UserController {
    constructor(userService) {
        this.userService = userService;
    }
    publicRoute() {
        return 'profile Route';
    }
    create(createUserDto) {
        return this.userService.create(createUserDto);
    }
    filter(filterOptionsDto) {
        return this.userService.filter(filterOptionsDto);
    }
};
__decorate([
    roles_decorator_1.Roles('admin'),
    permissions_decorator_1.Permissions('read', 'write'),
    common_1.Get('profile'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], UserController.prototype, "publicRoute", null);
__decorate([
    common_1.Post(),
    swagger_1.ApiOperation({ summary: 'Create user' }),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_dto_1.CreateUserDto]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "create", null);
__decorate([
    common_1.Post('filter'),
    swagger_1.ApiOperation({ summary: 'filter users' }),
    swagger_1.ApiBody({ type: filter_options_dto_1.FilterOptionsDto }),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [filter_options_dto_1.FilterOptionsDto]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "filter", null);
UserController = __decorate([
    swagger_1.ApiTags('User'),
    swagger_1.ApiBearerAuth(),
    common_1.Controller('user'),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UserController);
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map