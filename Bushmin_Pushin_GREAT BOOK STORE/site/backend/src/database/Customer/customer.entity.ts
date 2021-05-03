import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Offer } from "../Offer/offer.entitiy";

@Entity()
export class Customer extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @ManyToOne(() => Offer, offer => offer.id)
    @JoinColumn({name: "offer_id"})
    offer_id: Offer;
}