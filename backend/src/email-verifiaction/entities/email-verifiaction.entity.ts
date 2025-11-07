import { IsString } from "class-validator";
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("email_verification")
export class EmailVerifiaction {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    @IsString()
    email: string

    @Column()
    @IsString()
    otp: string
    
    @CreateDateColumn()
    createdAt:Date
}
