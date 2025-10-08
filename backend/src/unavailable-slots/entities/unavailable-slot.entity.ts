import { User } from "src/user/entities/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity("unavailable_slots")
export class UnavailableSlot {
    @PrimaryGeneratedColumn()
    id:number

    @Column({type:"date"})
    date:string

    @Column()
    start_time:string

    @Column()
    end_time:string

    @Column()
    reason:string

    @ManyToOne(()=>User)
    user:User

}
