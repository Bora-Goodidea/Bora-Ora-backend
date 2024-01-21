import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { StatusTypeEnum } from '@Types/CommonTypes';

@Entity()
export class UserPreferWeekday extends BaseEntity {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({ type: `int`, nullable: false })
    user_id: number;

    @Column({ type: `char`, nullable: true, length: 6 })
    time: string;

    @Column({ type: `enum`, nullable: false, enum: StatusTypeEnum, default: `N` })
    state: string;

    @UpdateDateColumn({ type: `timestamp`, nullable: false })
    updated_at: string;

    @CreateDateColumn({ type: `timestamp`, nullable: false })
    created_at: string;
}
