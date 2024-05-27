export interface Header {
    title: string,
    field: string,
    sort: boolean,
    sortBy?: 'asc' | 'desc' | null,
    filter?: any,
    type?: string
}
