import { Service } from "src/services/entities/service.entity";
import { User } from "src/user/entities/user.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { PaymentStatus } from "../enum/payement.status";

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

    @DeleteDateColumn()
    deletedAt:Date

    @ManyToOne(() => Service, (s) => s.bookings)
    @JoinColumn({ name: "serviceId" })
    service: Service

    @ManyToOne(() => User, (u) => u.bookings)
    @JoinColumn({ name: "userId" })
    user: User

}

