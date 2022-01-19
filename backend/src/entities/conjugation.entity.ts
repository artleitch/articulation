import {Entity, PrimaryGeneratedColumn} from 'typeorm'

@Entity('conjugations')
export class Conjugation {
    @PrimaryGeneratedColumn('uuid')
    id: string

    // conjugated form
    // related pronoun
    // tense
}
