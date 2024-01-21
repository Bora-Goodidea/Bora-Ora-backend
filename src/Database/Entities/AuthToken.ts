import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Users } from '@Entity/Users';
import { StatusTypeEnum } from '@Types/CommonTypes';

@Entity()
export class AuthToken extends BaseEntity {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({ type: `int`, nullable: false })
    user_id: number;

    @Column({ type: `varchar`, nullable: false, length: 255, unique: true })
    token: string;

    @Column({ type: `enum`, nullable: false, enum: StatusTypeEnum })
    status: string;

    @Column({ type: `timestamp`, nullable: true })
    expiration_at: string;

    @UpdateDateColumn({ type: `timestamp`, nullable: false })
    updated_at: Date;

    @CreateDateColumn({ type: `timestamp`, nullable: false })
    created_at: Date;

    @OneToOne(() => Users, (User) => User.id, { cascade: true })
    @JoinColumn({ name: `user_id` })
    user?: Users;
}
