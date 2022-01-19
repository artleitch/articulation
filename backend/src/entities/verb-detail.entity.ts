import {Entity, PrimaryGeneratedColumn} from 'typeorm'

@Entity('verb-details')
export class VerbDetail {
    @PrimaryGeneratedColumn('uuid')
    id: string

    // word
    // isSeparable (trenbarre)
}
