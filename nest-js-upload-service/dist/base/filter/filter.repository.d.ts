import { Repository } from 'typeorm';
import { FilterOptionsDto } from './dtos/filter-options.dto';
import { PaginationResultsDto } from './dtos/pagination-results.dto';
export declare class FilterRepository<T> extends Repository<T> {
    findWithPagination(options: FilterOptionsDto): Promise<PaginationResultsDto<T>>;
    private entityHasOwnProperty;
    private entityRelationHas;
    private entityRelationHasOwnProperty;
    private getRandomKey;
}
