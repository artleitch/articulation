import {Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn} from 'typeorm'
import {Language} from './language.entity'
import {Word} from './word.entity'

@Entity('users')
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    username: string

    @Column()
    password: string

    @ManyToMany((type) => Language, (language) => language.practicingUsers, {eager: true})
    @JoinTable()
    practiceLanguages: Language[]

    @OneToMany((type) => Word, (word) => word.user)
    words: Word[]
}
