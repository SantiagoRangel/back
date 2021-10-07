import { Chance } from 'chance';
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()

/**
 * Se define la clase de UserTransaction con  d unico y global así como el resto de sus atributos y su constructor
 */
export class ExpiredToken {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    token: string
    
    @CreateDateColumn()
    createdAt: Date;

    constructor(
        token: string,

    ) {
        this.id = new Chance().guid();
        this.token = token;
        return this;
    }
}
