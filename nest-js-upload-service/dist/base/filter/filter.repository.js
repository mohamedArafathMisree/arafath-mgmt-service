"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FilterRepository = void 0;
const typeorm_1 = require("typeorm");
const common_1 = require("@nestjs/common");
const pagination_results_dto_1 = require("./dtos/pagination-results.dto");
class FilterRepository extends typeorm_1.Repository {
    async findWithPagination(options) {
        const alias = 'alias';
        const queryBuilder = this.createQueryBuilder(alias);
        if (options.selects) {
            for (const [index, select] of options.selects.entries()) {
                const [table, key] = select.split('.');
                if (key) {
                }
                else {
                    if (!this.entityHasOwnProperty(table)) {
                        throw new common_1.NotAcceptableException(`Filter selects query data: ${table} is not acceptable`);
                    }
                    options.selects[index] = `${alias}.${table}`;
                }
            }
            options.selects.push(`${alias}.id`);
            queryBuilder.select(options.selects);
        }
        if (options.relations) {
            for (let relation of options.relations) {
                let isSelect = false;
                if (relation.endsWith('*')) {
                    isSelect = true;
                    relation = relation.slice(0, -1);
                }
                const [key, value] = relation.split('.');
                if (!this.entityRelationHas(key)) {
                    throw new common_1.NotAcceptableException(`Filter relations query data: ${key} is not acceptable`);
                }
                if (value) {
                    if (!this.entityRelationHasOwnProperty(value)) {
                        throw new common_1.NotAcceptableException(`Filter relations query data: ${value} is not acceptable`);
                    }
                    if (isSelect) {
                        queryBuilder.leftJoinAndSelect(`${key}.${value}`, value);
                    }
                    else {
                        queryBuilder.leftJoin(`${key}.${value}`, value);
                        queryBuilder.addSelect(`${value}.id`);
                    }
                }
                else {
                    if (isSelect) {
                        queryBuilder.leftJoinAndSelect(`${alias}.${key}`, key);
                    }
                    else {
                        queryBuilder.leftJoin(`${alias}.${key}`, key);
                        queryBuilder.addSelect(`${key}.id`);
                    }
                }
            }
        }
        if (options.equals) {
            for (const equal of options.equals) {
                const [path, allValue] = equal.split('=');
                let [table, key] = path.split('.');
                const values = allValue.split(',');
                if (key) {
                    if (!this.entityRelationHasOwnProperty(key)) {
                        throw new common_1.NotAcceptableException(`Filter equals query data: ${key} is not acceptable`);
                    }
                }
                else {
                    if (!this.entityHasOwnProperty(path)) {
                        throw new common_1.NotAcceptableException(`Filter equals query data: ${path} is not acceptable`);
                    }
                    table = alias;
                    key = path;
                }
                if (!(values.length > 1)) {
                    if (values[0] === 'NULL') {
                        queryBuilder.andWhere(`${table}.${key} IS NULL`);
                    }
                    else {
                        queryBuilder.andWhere(`${table}.${key} =:${key}`, {
                            [key]: values[0],
                        });
                    }
                }
                else {
                    queryBuilder.andWhere(`${table}.${key} IN(:${key})`, {
                        [key]: values,
                    });
                }
            }
        }
        if (options.contains) {
            for (const contain of options.contains) {
                const [path, allValue] = contain.split('=');
                let [table, key] = path.split('.');
                const values = allValue.split(',');
                if (key) {
                    if (!this.entityRelationHasOwnProperty(key)) {
                        throw new common_1.NotAcceptableException(`Filter contains query data: ${key} is not acceptable`);
                    }
                }
                else {
                    if (!this.entityHasOwnProperty(path)) {
                        throw new common_1.NotAcceptableException(`Filter contains query data: ${path} is not acceptable`);
                    }
                    table = alias;
                    key = path;
                }
                if (!(values.length > 1)) {
                    queryBuilder.andWhere(`LOWER(${table}.${key}) like LOWER(:${key})`, {
                        [key]: `%${values[0]}%`,
                    });
                }
                else {
                    for (const value of values) {
                        const randomKey = this.getRandomKey();
                        queryBuilder.orWhere(`LOWER(${table}.${key}) like LOWER(:${randomKey})`, {
                            [randomKey]: `%${value}%`,
                        });
                    }
                }
            }
        }
        if (options.betweens) {
            for (const between of options.betweens) {
                const [key, from, to] = between.split(',');
                let fromDate;
                let toDate;
                try {
                    fromDate = new Date(from).toISOString();
                    toDate = new Date(to).toISOString();
                }
                catch (e) {
                    throw new common_1.NotAcceptableException(`Filter between query dates are not acceptable`);
                }
                queryBuilder.andWhere(`${alias}.${key} BETWEEN :start AND :end`, {
                    start: fromDate,
                    end: toDate,
                });
            }
        }
        if (options.sort) {
            for (const k of options.sort) {
                if (k.endsWith('-')) {
                    if (this.entityHasOwnProperty(k.slice(0, -1))) {
                        queryBuilder.orderBy(`${alias}.${k.slice(0, -1)}`, 'DESC');
                    }
                }
                else if (k.endsWith('+')) {
                    if (this.entityHasOwnProperty(k.slice(0, -1))) {
                        queryBuilder.orderBy(`${alias}.${k.slice(0, -1)}`, 'ASC');
                    }
                }
                else {
                    return;
                }
            }
        }
        const allResultsCount = await queryBuilder.getCount();
        if (options.offset !== undefined && options.limit !== undefined) {
            queryBuilder.skip(options.offset);
            queryBuilder.take(options.limit);
        }
        const allResultsModelList = await queryBuilder.getMany();
        return new pagination_results_dto_1.PaginationResultsDto(allResultsModelList.length, allResultsCount, Math.ceil((options.offset - 1) / options.limit + 1), Math.ceil(allResultsCount / options.limit), allResultsModelList);
    }
    entityHasOwnProperty(field) {
        return this.metadata.propertiesMap.hasOwnProperty(field.split('.')[0]);
    }
    entityRelationHas(table) {
        for (const relation of this.metadata.relations) {
            if (relation.propertyName === table) {
                return true;
            }
        }
        return false;
    }
    entityRelationHasOwnProperty(field) {
        for (const relation of this.metadata.relations) {
            if (relation.inverseEntityMetadata.propertiesMap.hasOwnProperty(field)) {
                return true;
            }
        }
        return false;
    }
    getRandomKey() {
        return Math.random().toString(36).substr(2, 9);
    }
}
exports.FilterRepository = FilterRepository;
//# sourceMappingURL=filter.repository.js.map