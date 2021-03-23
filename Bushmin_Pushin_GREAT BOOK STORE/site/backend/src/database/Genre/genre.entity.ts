import { BaseEntity, Entity, ManyToMany, OneToMany, PrimaryColumn } from "typeorm";

@Entity()
export class Genre extends BaseEntity {
    @PrimaryColumn()
    genre: string;
}