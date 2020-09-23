import { ItemDto } from "./item.dto";

export class ItemsResponce {
    items: ItemDto[];
    pages: number;
    genre: string;
    descQuery: string;
}