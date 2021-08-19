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
exports.RoleUser = void 0;
const base_entity_1 = require("../../../../base/entities/base.entity");
const typeorm_1 = require("typeorm");
const user_entity_1 = require("../../user/entities/user.entity");
const role_entity_1 = require("../../role/entities/role.entity");
let RoleUser = class RoleUser extends base_entity_1.Base {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn('uuid'),
    __metadata("design:type", String)
], RoleUser.prototype, "id", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], RoleUser.prototype, "userId", void 0);
__decorate([
    typeorm_1.ManyToOne(() => user_entity_1.User, (user) => user.roleUsers, { nullable: false }),
    __metadata("design:type", user_entity_1.User)
], RoleUser.prototype, "user", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], RoleUser.prototype, "roleId", void 0);
__decorate([
    typeorm_1.ManyToOne(() => role_entity_1.Role, (role) => role.roleUsers, {
        nullable: false,
        eager: true,
    }),
    __metadata("design:type", role_entity_1.Role)
], RoleUser.prototype, "role", void 0);
RoleUser = __decorate([
    typeorm_1.Entity()
], RoleUser);
exports.RoleUser = RoleUser;
//# sourceMappingURL=role-user.entity.js.map