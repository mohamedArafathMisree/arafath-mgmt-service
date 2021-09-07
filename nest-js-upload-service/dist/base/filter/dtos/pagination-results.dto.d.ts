export declare class PaginationResultsDto<T> {
    readonly itemsPerPage: number;
    readonly totalItems: number;
    readonly currentPage: number;
    readonly totalPages: number;
    items: T[];
    constructor(itemsPerPage: number, totalItems: number, currentPage: number, totalPages: number, items: T[]);
}
