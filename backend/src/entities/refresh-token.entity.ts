import {Entity, Column, PrimaryGeneratedColumn} from 'typeorm'

@Entity('refresh_tokens')
export class RefreshToken {
    @PrimaryGeneratedColumn()
    id: string

    @Column()
    user_id: string

    @Column()
    is_revoked: boolean

    @Column()
    expires: Date
}
