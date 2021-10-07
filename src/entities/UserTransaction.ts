import { Chance } from 'chance';
import { Column, CreateDateColumn, Entity, Index, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class UserTransaction {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    amount: number
    
    @CreateDateColumn()
    createdAt: Date;

    constructor(
        amount: number,

    ) {
        this.id = new Chance().guid();
        this.amount = amount;
        return this;
    }
}
