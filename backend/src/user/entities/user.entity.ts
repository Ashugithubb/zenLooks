import { Booking } from "src/booking/entities/booking.entity";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Role } from "../enum/user.role";
import { UnavailableSlot } from "src/unavailable-slots/entities/unavailable-slot.entity";

@Entity("users")
export class User {
    @PrimaryGeneratedColumn()
    userId: number

    @Column({ unique: true })
    email: string

    @Column()
    name: string

    @Column()
    password: string

    @Column({ type: 'enum', enum: Role, default: Role.USER })
    role: Role

    @CreateDateColumn()
    createdAt: Date

    @OneToMany(() => Booking, (b) => b.user)
    bookings: Booking[];

    @OneToMany(() => UnavailableSlot, (u) => u.user)
    unavailableSlots: UnavailableSlot;
}
