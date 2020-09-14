import { EntityRepository, Repository, Double } from "typeorm";
import { Items } from "./items.entity";
import { ItemDto } from "./item.dto";
import { PaginationOptions } from "./pagination.options";

@EntityRepository(Items)
export class ItemsRepository extends Repository<Items> {
    async getAll(paginationOptions: PaginationOptions): Promise<Items[]> {
        return await this.find({
            take: paginationOptions.limit,
            skip: paginationOptions.skip
        });
    }

    async createItem(item: ItemDto): Promise<void> {
        const a = new Items();
        a.title = item.title;
        a.price = item.price;
        a.description = item.description;
        a.genre = item.genre;
        a.save();
    }

    async findAllWithParams(genre, description): Promise<Items[]> {
        var query = this.createQueryBuilder("items");
        if (genre) {
            query = query.where("items.genre = :g", { g: genre });
        }
        if (description && description !== ""){
            query = query.andWhere("LOWER(items.description) LIKE LOWER(:d)", { d: `%${description}%` });
            query = query.orWhere("LOWER(items.title) LIKE LOWER(:d)", { d: `%${description}%` })
        }

        return await query.getMany();
    }
}
