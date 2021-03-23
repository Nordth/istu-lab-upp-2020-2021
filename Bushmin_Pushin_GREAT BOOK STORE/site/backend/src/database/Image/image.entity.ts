import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Description } from "../Description/description.entity";

@Entity()
export class Image extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    lowRes: string;

    @Column()
    midRes: string;

    @Column()
    highRes: string;

    @ManyToOne(() => Description, description => description.id)
    @JoinColumn({name: "desc_id"})
    desc_id: Description;
}