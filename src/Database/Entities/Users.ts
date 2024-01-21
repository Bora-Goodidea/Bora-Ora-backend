import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, UpdateDateColumn, CreateDateColumn } from 'typeorm';
import { StatusTypeEnum } from '@Types/CommonTypes';

@Entity()
export class Users extends BaseEntity {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({ type: `varchar`, nullable: false, length: 50, unique: true })
    uid: string;

    @Column({ type: `char`, nullable: false, length: 6 })
    type: string;

    @Column({ type: `char`, nullable: false, length: 6 })
    level: string;

    @Column({ type: `varchar`, nullable: false, length: 255, unique: true })
    email: string;

    @Column({ type: `varchar`, nullable: false, length: 255 })
    password: string;

    @Column({ type: `varchar`, nullable: false, length: 50 })
    name: string;

    @Column({ type: `char`, nullable: false, length: 6 })
    gender: string;

    @Column({ type: `char`, nullable: false, length: 8 })
    birthday: string;

    @Column({ type: `char`, nullable: false, length: 6 })
    status: string;

    @Column({ type: `enum`, nullable: false, enum: StatusTypeEnum, default: `N` })
    email_verified: string;

    @UpdateDateColumn({ type: `timestamp`, nullable: false })
    updated_at: string;

    @CreateDateColumn({ type: `timestamp`, nullable: false })
    created_at: string;
}
