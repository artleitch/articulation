// app/modules/authentication/refresh-tokens.repository.ts

import {Injectable} from '@nestjs/common'
import {User} from '../../entities/user.entity'
import {RefreshToken} from '../../entities/refresh-token.entity'
import {InjectRepository} from '@nestjs/typeorm'
import {Repository} from 'typeorm'

@Injectable()
export class RefreshTokensRepository {
    constructor(@InjectRepository(RefreshToken) private refreshTokens: Repository<RefreshToken>) {}
    public async createRefreshToken(user: User, ttl: number): Promise<RefreshToken> {
        const token = new RefreshToken()

        token.user_id = user.id
        token.is_revoked = false

        const expiration = new Date()
        expiration.setTime(expiration.getTime() + ttl)

        token.expires = expiration

        return this.refreshTokens.save(token)
    }

    public async findTokenById(id: number): Promise<RefreshToken | null> {
        return this.refreshTokens.findOne({
            where: {
                id,
            },
        })
    }
}
