import { User } from "../../user/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity("unavailable_slots")
export class UnavailableSlot {
    @PrimaryGeneratedColumn()
    id:number

    @Column({type:"date"})
    date:string

    @Column({type:"time"})
    start_time:string

    @Column({type:"time"})
    end_time:string

    @Column()
    reason:string

    @ManyToOne(()=>User)
    @JoinColumn({
        name:"userId"
    })
    user:User

}
