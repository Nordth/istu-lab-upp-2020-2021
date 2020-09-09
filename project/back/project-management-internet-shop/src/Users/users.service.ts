import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersRepository } from './users.repository';
import { Users } from './users.entity';
import { UserDto } from './user.dto';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(UsersRepository)
        private usersRepository: UsersRepository
    ) { }

    async getAll() : Promise<Users[]> {
        return await this.usersRepository.getAll();
    }

    async createOne(user: UserDto) {
        this.usersRepository.createUser(user);
    }
}
