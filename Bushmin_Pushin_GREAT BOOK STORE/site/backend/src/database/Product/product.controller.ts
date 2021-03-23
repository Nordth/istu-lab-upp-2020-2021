import { Controller, Get, Query, Param, Post } from '@nestjs/common';
import { ProductsResponce, PaginationOptions, ItemResponce } from 'src/service/pagination';
import { ProductService } from './product.service';

@Controller('items')
export class ProductController {
    constructor(
        private productService: ProductService,
    ) { }

    @Get()
    async GetAllItems(@Query() qu): Promise<ProductsResponce> {
        var { genre, description, page, limit } = qu;
        
        const responce = new ProductsResponce();
        
        if (genre) {
            var items = await this.productService.getByGenre(genre)
            responce.items = items.splice(page*limit, limit)
            responce.pages = Math.floor(items.length / limit);
            return responce;
        }

        if (description && description !== "") {
            var items = await this.productService.getByDescription(description)
            responce.items = items.splice(page*limit, limit)
            responce.pages = Math.floor(items.length / limit);
            responce.descQuery = description;
            return responce;
        }
        
        return await this.productService.getAll(new PaginationOptions(page, limit));
    }

    @Get(":id")
    async GetById(@Param() params): Promise<any> {
        return await this.productService.getById(params.id);
    }
}