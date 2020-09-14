import { Controller, Get, Body, Post, ValidationPipe, BadRequestException, Query, Delete } from '@nestjs/common';
import { ItemsService } from './Items.service';
import { Items } from './Items.entity';
import { ItemDto } from './item.dto';
import { PaginationOptions } from './pagination.options';

@Controller('items')
export class ItemsController {
    constructor(
        private ItemsService: ItemsService,
    ) { }

    @Get()
    GetAllItems(@Query() qu): Promise<Items[]> {
        var { genre, description, page, limit } = qu;

        if (genre || description) {
            return this.ItemsService.findAllWithParams(genre, description).then(arr => {
                return arr.splice(page * limit, limit)
            });
        }

        return this.ItemsService.getAll(new PaginationOptions(page, limit));
    }

    @Post('/create')
    CreateNew(@Body(ValidationPipe) item: ItemDto) {
        if (item && Object.keys(item).length !== 0) {
            this.ItemsService.createOne(item);
        } else {
            throw new BadRequestException();
        }
    }

    @Post('/createarray')
    CreateArray(@Body() items: ItemDto[]) {
        this.ItemsService.createFromArray(items)
    }

    @Delete()
    DropTable() {
        this.ItemsService.dropTable();
    }
}
