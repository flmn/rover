export interface ListResultDTO<T> {
    pageNumber: number;
    pageSize: number;
    total: number;
    items: T[]
}