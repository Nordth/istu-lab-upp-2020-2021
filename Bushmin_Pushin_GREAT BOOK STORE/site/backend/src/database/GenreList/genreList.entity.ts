import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Genre } from "../Genre/genre.entity";
import { Product } from "../Product/product.entity";

@Entity()
export class GenreList extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Genre, g => g.genre)
    @JoinColumn({name: "genre_id"})
    genre_id: Genre;

    @ManyToOne(() => Product, p => p.genre)
    @JoinColumn({name: "product_id"})
    product_id: Product;
}