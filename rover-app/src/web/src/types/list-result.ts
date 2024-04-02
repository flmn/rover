interface Meta {
    total: number;
}

export interface ListResultDTO<T> {
    meta: Meta;
    records: T[]
}