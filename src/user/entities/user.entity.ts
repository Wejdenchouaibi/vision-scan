import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("user")
export class User {
    @PrimaryGeneratedColumn()
    id:number
    @Column()
    fullname:string
    @Column()
    email:string
    @Column()
    password:string
}
