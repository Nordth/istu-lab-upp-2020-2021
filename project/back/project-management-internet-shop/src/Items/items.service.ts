import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ItemsRepository } from './items.repository';
import { Items } from './items.entity';
import { ItemDto } from './item.dto';
import { PaginationOptions } from './pagination.options';

@Injectable()
export class ItemsService {
    constructor(
        @InjectRepository(ItemsRepository)
        private itemsRepository: ItemsRepository
    ) { }

    async getAll(paginationOptions: PaginationOptions): Promise<Items[]> {
        return await this.itemsRepository.getAll(paginationOptions);
    }

    async findAllWithParams(genre, description): Promise<Items[]> {
        return await this.itemsRepository.findAllWithParams(genre, description);
    }

    async createOne(item: ItemDto) {
        this.itemsRepository.createItem(item);
    }

    async createFromArray(items: ItemDto[]): Promise<void> {
        items.forEach(item => { this.createOne(item) })
    }

    async dropTable() {
        this.itemsRepository.clear();
    }
}
