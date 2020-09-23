import { EntityRepository, Repository } from "typeorm";
import { Users } from "./users.entity";
import { UserDto } from "./user.dto";

@EntityRepository(Users)
export class UsersRepository extends Repository<Users> {
    async getAll(): Promise<Users[]> {
        return await this.find();
    }

    async createUser(user: UserDto): Promise<void> {
        const a = new Users();
        a.login = user.login;
        a.password = user.password;
        a.save();
    }
}
