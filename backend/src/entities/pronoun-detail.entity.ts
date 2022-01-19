import {Entity, PrimaryGeneratedColumn} from 'typeorm'

@Entity('pronoun-details')
export class PronounDetail {
    @PrimaryGeneratedColumn('uuid')
    id: string

    // person (first, second, third)
    // number (singlular, plural)
    // gender (neutral, masculine, feminine)
}
