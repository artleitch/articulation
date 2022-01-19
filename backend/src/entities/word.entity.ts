import {Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn} from 'typeorm'
import {Language} from './language.entity'
import {User} from './user.entity'

export enum WordTypeEnum {
    NOUN = 'noun',
    ADJECTIVE = 'adjective',
    PRONOUN = 'pronoun',
    VERB = 'verb',
}

@Entity('words')
export class Word {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column('text')
    originWord: string

    @Column('text')
    destinationWord: string

    @Column({
        type: 'enum',
        enum: WordTypeEnum,
        default: WordTypeEnum.NOUN,
    })
    type: WordTypeEnum

    @ManyToOne((type) => Language, (language) => language.words, {eager: true})
    @JoinColumn()
    language: Language

    @ManyToOne((type) => User, (user) => user.words)
    @JoinColumn()
    user: User

    /*
    @OneToOne((type) => NounDetail)
    @JoinColumn()
    nounDetail: NounDetail
    */
}
