import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../../user/entities/user.entity";

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
    @Column({ type: 'decimal', precision: 6, scale: 2, nullable: true })
    confidence: number;

    @ManyToOne(() => User, (user) => user.scannedObjects, { onDelete: 'CASCADE' })
    user: User;

    getDetails(): string {
        return `Object: ${this.name}, Category: ${this.category}, Confidence: ${this.confidence}%`;
    }
}
