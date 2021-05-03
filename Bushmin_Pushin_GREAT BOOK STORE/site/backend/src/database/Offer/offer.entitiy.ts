import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Customer } from "../Customer/customer.entity";
import { ProductKey } from "../ProductKey/productKey.entity";

@Entity()
export class Offer extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: "date"})
    date: Date;

    @OneToMany(() => Customer, customer => customer.id)
    @JoinColumn({name: "customer_id"})
    customer_id: Customer;

    @ManyToOne(() => ProductKey, pk => pk.id)
    @JoinColumn({name: "product_key_id"})
    product_key_id: ProductKey;
}