import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToOne, JoinColumn, CreateDateColumn } from 'typeorm';
import { Codes } from '@Entity/Codes';
@Entity()
export class Regions extends BaseEntity {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({ type: `varchar`, nullable: false, length: 6, unique: true })
    code_id: string;

    @Column({ type: `varchar`, nullable: false, length: 6, unique: true })
    code: string;

    @Column({ type: `varchar`, nullable: false, length: 6, unique: false })
    name: string;

    @CreateDateColumn({ type: `timestamp`, nullable: false })
    created_at: string;

    @OneToOne(() => Codes, (Code) => Code.code_id, { cascade: true })
    @JoinColumn({ name: `code_id`, referencedColumnName: `code_id` })
    r_code_id?: Codes;
}
