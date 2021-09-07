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
exports.SimpleFilterOptionsDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
const api_model_property_decorator_1 = require("@nestjs/swagger/dist/decorators/api-model-property.decorator");
class SimpleFilterOptionsDto {
    constructor() {
        this.order = {
            id: 'DESC',
        };
        this.withDeleted = false;
        this.skip = 0;
        this.take = 10;
    }
}
__decorate([
    api_model_property_decorator_1.ApiModelProperty({ example: ['id', 'name'] }),
    swagger_1.ApiProperty({ type: [String] }),
    __metadata("design:type", Array)
], SimpleFilterOptionsDto.prototype, "selects", void 0);
__decorate([
    api_model_property_decorator_1.ApiModelProperty({ example: ['user', 'csu'] }),
    swagger_1.ApiProperty({ type: [String] }),
    __metadata("design:type", Array)
], SimpleFilterOptionsDto.prototype, "relations", void 0);
__decorate([
    swagger_1.ApiProperty({ type: typeorm_1.Any }),
    __metadata("design:type", Object)
], SimpleFilterOptionsDto.prototype, "join", void 0);
__decorate([
    api_model_property_decorator_1.ApiModelProperty({ example: [{ name: 'Branch 1', code: 'BR1' }] }),
    swagger_1.ApiProperty({ type: [String] }),
    __metadata("design:type", Array)
], SimpleFilterOptionsDto.prototype, "where", void 0);
__decorate([
    api_model_property_decorator_1.ApiModelProperty({
        example: {
            id: 'DESC',
        },
    }),
    swagger_1.ApiProperty({ type: Object }),
    __metadata("design:type", Object)
], SimpleFilterOptionsDto.prototype, "order", void 0);
__decorate([
    api_model_property_decorator_1.ApiModelProperty({ example: false }),
    swagger_1.ApiProperty({ type: Boolean }),
    __metadata("design:type", Boolean)
], SimpleFilterOptionsDto.prototype, "withDeleted", void 0);
__decorate([
    swagger_1.ApiProperty({ type: Number }),
    __metadata("design:type", Number)
], SimpleFilterOptionsDto.prototype, "skip", void 0);
__decorate([
    api_model_property_decorator_1.ApiModelProperty({ example: 10 }),
    swagger_1.ApiProperty({ type: Number }),
    __metadata("design:type", Number)
], SimpleFilterOptionsDto.prototype, "take", void 0);
exports.SimpleFilterOptionsDto = SimpleFilterOptionsDto;
//# sourceMappingURL=simple-filter-options.dto.js.map