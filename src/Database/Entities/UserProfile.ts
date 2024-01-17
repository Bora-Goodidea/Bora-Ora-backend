import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';
@Entity()
export class UserProfile extends BaseEntity {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({ type: `int`, nullable: false })
    user_id: number;
}
