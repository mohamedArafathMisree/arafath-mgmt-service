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
exports.SimplePaginationResultsDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class SimplePaginationResultsDto {
    constructor(totalItems, items, dto) {
        this.totalItems = 0;
        this.totalPages = 0;
        this.currentPage = 0;
        this.itemsPerPage = 0;
        this.totalItems = totalItems;
        this.totalPages = Math.ceil(totalItems / dto.take);
        this.currentPage = Math.ceil((dto.skip - 1) / dto.take + 1);
        this.itemsPerPage = items.length;
        this.items = items;
    }
}
__decorate([
    swagger_1.ApiProperty(),
    __metadata("design:type", Number)
], SimplePaginationResultsDto.prototype, "totalItems", void 0);
__decorate([
    swagger_1.ApiProperty(),
    __metadata("design:type", Number)
], SimplePaginationResultsDto.prototype, "totalPages", void 0);
__decorate([
    swagger_1.ApiProperty(),
    __metadata("design:type", Number)
], SimplePaginationResultsDto.prototype, "currentPage", void 0);
__decorate([
    swagger_1.ApiProperty(),
    __metadata("design:type", Number)
], SimplePaginationResultsDto.prototype, "itemsPerPage", void 0);
__decorate([
    swagger_1.ApiProperty(),
    __metadata("design:type", Object)
], SimplePaginationResultsDto.prototype, "items", void 0);
exports.SimplePaginationResultsDto = SimplePaginationResultsDto;
//# sourceMappingURL=simple-pagination-results.dto.js.map