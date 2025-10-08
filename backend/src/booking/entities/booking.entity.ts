import { Service } from "src/services/entities/service.entity";
import { User } from "src/user/entities/user.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity("bookings")
export class Booking {
    @PrimaryGeneratedColumn()
    bookingId: number

    @Column({type:"date"})
    date:string

    @Column()
    slot:string

    @Column()
    phoneNo:string

    @CreateDateColumn()
    bookedAt: Date

    @ManyToOne(() => Service,(s)=>s.bookings)
    @JoinColumn({ name: "serviceId" })
    service: Service

    @ManyToOne(() => User,(u)=>u.bookings)
     @JoinColumn({ name: "userId" })
    user: User

}

