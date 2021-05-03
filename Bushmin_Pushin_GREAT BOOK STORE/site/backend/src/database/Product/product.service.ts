import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ItemResponce, PaginationOptions, ProductsResponce } from 'src/service/pagination';
import { GenreList } from '../GenreList/genreList.entity';
import { ProductRepository } from './product.repository';

@Injectable()
export class ProductService {
    constructor(
        @InjectRepository(ProductRepository)
        private productRepository: ProductRepository
    ) { }

    async getAll(paginationOptions: PaginationOptions): Promise<ProductsResponce> {
        const responce = await this.productRepository.getAll(paginationOptions);

        var pr = new ProductsResponce();
        pr.genre = null;
        pr.items = [];

        for (var p of responce) {
            await this.convertToResponceItem(p).then(ri => pr.items.push(ri))
        }

        pr.pages = Math.floor(pr.items.length / paginationOptions.limit);

        return pr;
    }

    async getById(id: number): Promise<any> {
        return this.productRepository.query(`
        select p.id, p.title, p.price, d.text, i.* from product p
        left join description d
        on p.description_id = d.id
        left join image i
        on p.description_id = i.desc_id
        where p.id = '${id}'
        `)
    }

    async convertToResponceItem(p): Promise<ItemResponce> {
        var ir = new ItemResponce();
        ir.price = p.price;
        ir.title = p.title;
        ir.genre = await this.getGenres(p);
        ir.id = p.id;

        return ir;
    }

    async getGenres(a) {
        const genreRepo = GenreList.getRepository();
        var xd = [];
        for (var gl of a.genre) {
            var temp = await genreRepo.find({
                relations: ["genre_id"],
                where: { id: gl.id }
            })
            xd.push(temp[0].genre_id.genre)
        }

        return xd.join(', ');
    }

    async getByDescription(description: string) : Promise<ItemResponce[]> {
        return await this.productRepository.getByDescription(description);
    }

    async getByGenre(genre: string) : Promise<ItemResponce[]> {
        return await this.productRepository.getByGenre(genre);
    }
}