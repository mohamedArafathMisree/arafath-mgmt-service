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
exports.User = void 0;
const base_entity_1 = require("../../../../base/entities/base.entity");
const typeorm_1 = require("typeorm");
const bcrypt = require("bcrypt");
const role_user_entity_1 = require("../../role-user/entities/role-user.entity");
let User = class User extends base_entity_1.Base {
    async hashPassword() {
        this.password = await bcrypt.hash(this.password, Number(process.env.HASH_SALT));
    }
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn('uuid'),
    __metadata("design:type", String)
], User.prototype, "id", void 0);
__decorate([
    typeorm_1.Column({ name: 'user_name', length: 150, unique: true }),
    __metadata("design:type", String)
], User.prototype, "userName", void 0);
__decorate([
    typeorm_1.Column({ name: 'email', length: 150, unique: true }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    typeorm_1.Column({ name: 'password', length: 1024 }),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    typeorm_1.Column({ name: 'first_name', length: 1024 }),
    __metadata("design:type", String)
], User.prototype, "firstName", void 0);
__decorate([
    typeorm_1.Column({ name: 'last_name', length: 1024 }),
    __metadata("design:type", String)
], User.prototype, "lastName", void 0);
__decorate([
    typeorm_1.Column({ name: 'display_name', length: 1024 }),
    __metadata("design:type", String)
], User.prototype, "displayName", void 0);
__decorate([
    typeorm_1.Column({ name: 'mobile_no', length: 12 }),
    __metadata("design:type", String)
], User.prototype, "mobileNo", void 0);
__decorate([
    typeorm_1.Column({ name: 'address', length: 1024, nullable: true }),
    __metadata("design:type", String)
], User.prototype, "address", void 0);
__decorate([
    typeorm_1.OneToMany(() => role_user_entity_1.RoleUser, (roleUsers) => roleUsers.user, { eager: true }),
    __metadata("design:type", Array)
], User.prototype, "roleUsers", void 0);
__decorate([
    typeorm_1.BeforeInsert(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], User.prototype, "hashPassword", null);
User = __decorate([
    typeorm_1.Entity()
], User);
exports.User = User;
//# sourceMappingURL=user.entity.js.map