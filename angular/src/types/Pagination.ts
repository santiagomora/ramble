type Pagination = {
    total: number,
    skip: number,
    limit: number
}

interface PaginatedData<T>{
    data:T,
    pagination:Pagination
}

export {PaginatedData,Pagination}