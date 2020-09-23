import { Controller, Get, Body, Post, BadRequestException, ValidationPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { isUndefined } from 'util';
import { UserDto } from './user.dto';
import { Users } from './users.entity';

@Controller('users')
export class UsersController {
    constructor(
        private usersService: UsersService,
    ) { }

    @Get()
    GetAllUsers() : Promise<Users[]> {
        return this.usersService.getAll();
    }

    @Post('/create')
    CreateNew(@Body(ValidationPipe) user: UserDto) {
        if (!isUndefined(user) && Object.keys(user).length !== 0) {
            this.usersService.createOne(user);
        } else {
            throw new BadRequestException();
        }
    }
}
