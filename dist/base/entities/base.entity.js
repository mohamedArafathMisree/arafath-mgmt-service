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
exports.Base = void 0;
const typeorm_1 = require("typeorm");
class Base extends typeorm_1.BaseEntity {
}
__decorate([
    typeorm_1.Column({ name: 'created_by', length: 50, default: 'SYSTEM' }),
    __metadata("design:type", String)
], Base.prototype, "createdBy", void 0);
__decorate([
    typeorm_1.Column({ name: 'updated_by', length: 50, default: 'SYSTEM' }),
    __metadata("design:type", String)
], Base.prototype, "updatedBy", void 0);
__decorate([
    typeorm_1.CreateDateColumn({ name: 'created_on' }),
    __metadata("design:type", Date)
], Base.prototype, "createdOn", void 0);
__decorate([
    typeorm_1.UpdateDateColumn({ name: 'updated_on' }),
    __metadata("design:type", Date)
], Base.prototype, "updatedOn", void 0);
__decorate([
    typeorm_1.DeleteDateColumn({ name: 'deleted_on' }),
    __metadata("design:type", Date)
], Base.prototype, "deletedOn", void 0);
__decorate([
    typeorm_1.Column({ name: 'is_active', default: true }),
    __metadata("design:type", Boolean)
], Base.prototype, "isActive", void 0);
exports.Base = Base;
//# sourceMappingURL=base.entity.js.map