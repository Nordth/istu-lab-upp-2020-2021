import { IsString, IsNotEmpty, IsNumberString, IsEnum, IsArray } from "class-validator";
import { Genre } from "./items.entity";

export class ItemDto {
    @IsString()
    @IsNotEmpty()
    title: string;

    @IsNumberString()
    price: number;

    @IsString()
    @IsNotEmpty()
    description: string;

    @IsEnum(Genre)
    genre: Genre;
}