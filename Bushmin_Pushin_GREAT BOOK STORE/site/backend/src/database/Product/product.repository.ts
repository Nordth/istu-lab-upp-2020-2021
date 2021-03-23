import { ItemResponce, PaginationOptions } from "src/service/pagination";
import { EntityRepository, Repository } from "typeorm";
import { Product } from "./product.entity";

@EntityRepository(Product)
export class ProductRepository extends Repository<Product> {
    async getAll(paginationOptions: PaginationOptions): Promise<Product[]> {
        return await this.find({
            relations: ["genre"],
            take: paginationOptions.limit,
            skip: paginationOptions.skip
        });
    }

    async getByDescription(description: string) : Promise<ItemResponce[]> {
        return await this.query(`
            select p.id, p.title, p.price, string_agg(gl.genre_id, ', ') as genre from product p
            left join genre_list gl
            ON p.id = gl.product_id
            WHERE p.title like '%${description}%'
            GROUP BY p.id
        `);
    }

    async getByGenre(genre: string) : Promise<ItemResponce[]> {
        return await this.query(`
            select p.id, p.title, p.price, gl.genre_id as genre from genre_list gl
            left join product p
            ON gl.product_id = p.id
            where gl.genre_id = '${genre}'
        `)
    }
}