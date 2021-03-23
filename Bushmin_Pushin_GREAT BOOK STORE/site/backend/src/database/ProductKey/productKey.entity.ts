import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Offer } from "../Offer/offer.entitiy";
import { Product } from "../Product/product.entity";

@Entity()
export class ProductKey extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    key: number;

    @ManyToOne(() => Product, product => product.id)
    @JoinColumn({name: "product_id"})
    product_id: Product;

    @OneToMany(() => Offer, offer => offer.id)
    @JoinColumn({name: "offer_id"})
    offer_id: Offer;
}