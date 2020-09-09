import { IsString, IsNotEmpty, IsNumberString } from "class-validator";

export class ItemDto {
    @IsString()
    @IsNotEmpty()
    title: string;

    @IsNumberString()
    price: number;

    @IsString()
    @IsNotEmpty()
    description: string;
}