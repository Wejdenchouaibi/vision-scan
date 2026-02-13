import { BeforeInsert, BeforeUpdate, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import * as argon2 from 'argon2';
import { ScannedObject } from "../../scanned-object/entities/scanned-object.entity";

@Entity("user")
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  fullname: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @OneToMany(() => ScannedObject, (scannedObject) => scannedObject.user)
  scannedObjects: ScannedObject[];

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    if (this.password) {
      // Check if password is already hashed (argon2 hashes start with $argon2)
      if (!this.password.startsWith('$argon2')) {
        this.password = await argon2.hash(this.password);
      }
    }
  }
}
