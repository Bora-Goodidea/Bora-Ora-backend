import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';
import { StatusTypeEnum } from '@Types/CommonTypes';
@Entity()
export class UserPreferCity extends BaseEntity {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({ type: `int`, nullable: false })
    user_id: number;

    @Column({ type: `char`, nullable: true, length: 6 })
    city: string;

    @Column({ type: `char`, nullable: true, length: 6 })
    town: string;

    @Column({ type: `enum`, nullable: false, enum: StatusTypeEnum, default: `N` })
    state: string;

    @Column({ type: `timestamp`, nullable: false })
    updated_at: string;

    @Column({ type: `timestamp`, nullable: false })
    created_at: string;
}
