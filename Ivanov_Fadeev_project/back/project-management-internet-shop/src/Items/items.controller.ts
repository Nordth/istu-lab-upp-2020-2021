import { Controller, Get, Body, Post, ValidationPipe, BadRequestException, Query, Delete } from '@nestjs/common';
import { ItemsService } from './Items.service';
import { ItemDto } from './item.dto';
import { PaginationOptions } from './pagination.options';
import { ItemsResponce } from './items.response';

@Controller('items')
export class ItemsController {
    constructor(
        private ItemsService: ItemsService,
    ) { }

    @Get()
    async GetAllItems(@Query() qu): Promise<ItemsResponce> {
        const responce = new ItemsResponce();
        var { genre, description, page, limit } = qu;

        if (genre || description) {
            responce.items = await this.ItemsService.findAllWithParams(genre, description)
                .then(arr => {
                    responce.pages = Math.floor(arr.length / parseInt(limit));
                    return arr.splice(page * limit, limit)
                });
        } else {
            responce.items = await this.ItemsService.getAll(new PaginationOptions(page, limit));
            responce.pages = Math.floor(await this.ItemsService.countAll() / parseInt(limit));
        }

        responce.genre = genre;
        responce.descQuery = description;

        return responce;
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
