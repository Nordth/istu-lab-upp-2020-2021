export class ItemResponce{
    id: number;
    title: string
    genre: string;
    price: number;
}

export class ProductsResponce {	
    items: ItemResponce[];	
    pages: number;	
    genre: string;	
    descQuery: string;	
} 

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