import { Booking } from "../../booking/entities/booking.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Category } from "../enum/category.enum";

@Entity("services")
export class Service {
    @PrimaryGeneratedColumn()
    serviceId: number

    @Column()
    title: string

    @Column()
    description: string

    @Column()
    price: number

    @Column()
    time: number

    @Column({ default: 0 })
    discount: number

    @Column()
    imageUrl: string

    @Column({type:"enum",enum:Category})
    category:Category


    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date
    
    @DeleteDateColumn()
    deletedAt:Date

    @OneToMany(() => Booking, (b) => b.service)
    bookings: Booking[]

}
