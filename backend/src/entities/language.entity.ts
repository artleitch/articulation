import {Entity, Column, PrimaryGeneratedColumn, ManyToMany, OneToMany} from 'typeorm'
import {User} from './user.entity'
import {Word} from './word.entity'

@Entity('languages')
export class Language {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    languageCode: string

    @ManyToMany((type) => User, (user) => user.practiceLanguages)
    practicingUsers: User[]

    @OneToMany((type) => Word, (word) => word.language)
    words: Word[]
}
