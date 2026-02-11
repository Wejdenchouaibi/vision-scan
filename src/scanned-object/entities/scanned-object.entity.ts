import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class ScannedObject {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    name: string;
    @Column()
    description: string;
    @Column()
    imageUrl: string;
    @Column()
    category: string;
    @Column()
    scanDate: Date;
    @Column({type: 'float', nullable: true})
    confidence: number;

}
