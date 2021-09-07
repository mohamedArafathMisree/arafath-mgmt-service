export declare class SimplePaginationResultsDto<T> {
    readonly totalItems: number;
    readonly totalPages: number;
    readonly currentPage: number;
    readonly itemsPerPage: number;
    items: any;
    constructor(totalItems: number, items: T[], dto: any);
}
