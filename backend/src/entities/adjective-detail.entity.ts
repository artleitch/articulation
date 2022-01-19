import {Entity, PrimaryGeneratedColumn} from 'typeorm'

@Entity('adjective-details')
export class AdjectiveDetail {
    @PrimaryGeneratedColumn('uuid')
    id: string

    // type (strong, weak)
}
