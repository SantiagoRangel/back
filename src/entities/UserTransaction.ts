import { Chance } from 'chance';
import { Column, CreateDateColumn, Entity, Index, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()

/**
 * Se define la clase de UserTransaction con  d unico y global así como el resto de sus atributos y su constructor
 */
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
