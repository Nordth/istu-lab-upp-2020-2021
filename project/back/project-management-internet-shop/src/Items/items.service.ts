import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ItemsRepository } from './items.repository';
import { Items } from './items.entity';
import { ItemDto } from './item.dto';

@Injectable()
export class ItemsService {
    constructor(
        @InjectRepository(ItemsRepository)
        private itemsRepository: ItemsRepository
    ) { }

    async getAll() : Promise<Items[]> {
        return await this.itemsRepository.getAll();
    }

    async createOne(item: ItemDto) {
        this.itemsRepository.createItem(item);
    }
}
