import { Controller, Get, Body, Post, ValidationPipe, BadRequestException, Query } from '@nestjs/common';
import { ItemsService } from './Items.service';
import { Items } from './Items.entity';
import { isUndefined } from 'util';
import { ItemDto } from './item.dto';

@Controller('items')
export class ItemsController {
    constructor(
        private ItemsService: ItemsService,
    ) { }

    @Get()
    GetAllItems(@Query() qu): Promise<Items[]> {
        if (Object.keys(qu).length !== 0) {
            var {genre, description} = qu;
            return this.ItemsService.findAllWithParams(genre, description);
        }
        
        return this.ItemsService.getAll();
    }

    @Post('/create')
    CreateNew(@Body(ValidationPipe) item: ItemDto) {
        if (!isUndefined(item) && Object.keys(item).length !== 0) {
            this.ItemsService.createOne(item);
        } else {
            throw new BadRequestException();
        }
    }
}
