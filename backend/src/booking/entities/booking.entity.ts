import { Service } from "../../services/entities/service.entity";
import { User } from "src/user/entities/user.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { BookingStatus, PaymentStatus } from "../enum/payement.status";
import { ServiceDelivered } from "src/service-delivered/entities/service-delivered.entity";

@Entity("bookings")
export class Booking {
    @PrimaryGeneratedColumn()
    bookingId: number
    @Column({ type: "date" })
    date: string

    @Column({ type: "time" })
    slot: string

    @Column()
    phoneNo: string

    @CreateDateColumn()
    bookedAt: Date

    @Column({
        type: "enum",
        enum: PaymentStatus,
        default: PaymentStatus.PENDING,
    })
    paymentStatus: PaymentStatus;

    @Column({
        type:"enum",
        enum:BookingStatus,
        default:BookingStatus.PENDING
    })
    bookingStatus:BookingStatus


    @DeleteDateColumn()
    deletedAt:Date

    

    @ManyToOne(() => Service, (s) => s.bookings)
    @JoinColumn({ name: "serviceId" })
    service: Service

    @ManyToOne(() => User, (u) => u.bookings)
    @JoinColumn({ name: "userId" })
    user: User

    @OneToMany(()=>ServiceDelivered,(s)=>s.booking)
    serviceDelivered:ServiceDelivered[]

}

