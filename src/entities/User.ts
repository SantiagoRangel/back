import { Chance } from 'chance';
import { Column, CreateDateColumn, Entity, Index, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
@Entity()

/**
 * Se define la clase de User con user id unico y global así como el resto de sus atributos y su constructor
 */
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ length: 50 })
    name: string;

    @Index({ unique: true })
    @Column({ length: 50, unique: true })
    email: string;


    @Column({ length: 100 })
    password: string;

    @CreateDateColumn()
    createdAt: Date;

  

    constructor(
        name: string,
        email: string,
        password: string,

    ) {
        this.id = new Chance().guid();
        this.email = email;
        this.name = name;
        this.password = password;
        return this;
    }
}
