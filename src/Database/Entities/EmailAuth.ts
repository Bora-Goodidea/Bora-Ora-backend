import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, CreateDateColumn } from 'typeorm';
import { StatusTypeEnum } from '@Types/CommonTypes';

@Entity()
export class EmailAuth extends BaseEntity {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({ type: `int`, nullable: false })
    user_id: number;

    @Column({ type: `varchar`, nullable: false, length: 255 })
    auth_code: string;

    @Column({ type: `enum`, nullable: false, enum: StatusTypeEnum, default: `N` })
    email_verified: string;

    @Column({ type: `timestamp`, nullable: false })
    email_verified_at: string;

    @CreateDateColumn({ type: `timestamp`, nullable: false })
    created_at: string;
}
