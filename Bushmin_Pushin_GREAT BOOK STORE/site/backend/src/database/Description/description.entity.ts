import { BaseEntity, Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Image } from "../Image/image.entity";

@Entity()
export class Description extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    text: string;

    @OneToMany(() => Image, image => image.id)
    @JoinColumn({name: "image_id"})
    image_id: Image;
}