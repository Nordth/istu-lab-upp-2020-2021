import { IsString, MinLength, MaxLength, Matches } from "class-validator";

export class UserDto {
    @IsString()
    @MinLength(4)
    @MaxLength(14)
    login: string;

    @IsString()
    @MinLength(8)
    @MaxLength(20)
    @Matches(
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).*$/,
        { message: 'Password must contain one upper letter' }
    )
    password: string;
}