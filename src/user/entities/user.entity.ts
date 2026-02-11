import { BeforeInsert, BeforeUpdate, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import * as argon2 from 'argon2';
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
    @BeforeInsert()
    @BeforeUpdate()
    async hashPassword() {
      if (this.password&& !this.password.startsWith('$argon2')) {
        this.password = await argon2.hash(this.password);
        
      }
}}
