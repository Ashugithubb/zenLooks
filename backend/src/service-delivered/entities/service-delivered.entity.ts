import { Booking } from "src/booking/entities/booking.entity";
import { Column, CreateDateColumn, Entity, ManyToMany, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity("service-delivered")
export class ServiceDelivered {
    @PrimaryGeneratedColumn()
    id:number

    @Column()
    otp:string

    @Column({default:false})
    verified:boolean

    @ManyToOne(()=>Booking)
    booking:Booking

    @CreateDateColumn()
    createdAt:Date

}
