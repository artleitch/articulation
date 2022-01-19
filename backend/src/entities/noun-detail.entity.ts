import {Entity, PrimaryGeneratedColumn} from 'typeorm'

@Entity('noun-details')
export class NounDetail {
    @PrimaryGeneratedColumn('uuid')
    id: string

    // gender
    // plural form
}
