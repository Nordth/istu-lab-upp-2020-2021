export class PaginationOptions {
    constructor(pageNumber = 0, limit = 10) {
        this.pageNumber = pageNumber;
        this.limit = limit;
        this.skip = pageNumber * limit;
    }

    pageNumber: number;
    limit: number;
    skip: number;
}
