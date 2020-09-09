import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, Unique } from "typeorm";

@Entity()
@Unique(['login'])
export class Users extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    login: string;

    @Column()
    password: string;
}
