import { Entity, BaseEntity, PrimaryGeneratedColumn, Column } from "typeorm";

export enum Genre {
    ACTION = "action",
    ROLEPLAY = "roleplay",
    STRATEGY = "strategy",
    SIMULATOR = "simulator",
    OTHER = "other",
}

@Entity()
export class Items extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column({
        type: "double precision",
        default: 0.00
    })
    price: number;

    @Column()
    description: string;

    @Column({
        type: "enum",
        enum: Genre,
    })
    genre: Genre;
}
