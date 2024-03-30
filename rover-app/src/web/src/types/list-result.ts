interface Meta {
    total: number;
}

export interface ListResultVO<T> {
    meta: Meta;
    records: T[]
}