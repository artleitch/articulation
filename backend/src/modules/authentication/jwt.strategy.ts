import {Injectable} from '@nestjs/common'
import {PassportStrategy} from '@nestjs/passport'
import {ExtractJwt, Strategy} from 'passport-jwt'

import {UsersService} from '../../modules/users/users.service'

import {User} from '../../entities/user.entity'

export interface AccessTokenPayload {
    sub: number
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    private users: UsersService

    public constructor(users: UsersService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: '<SECRET KEY>',
            signOptions: {
                expiresIn: '5m',
            },
        })

        this.users = users
    }

    async validate(payload: AccessTokenPayload): Promise<User> {
        const {sub: id} = payload

        const user = await this.users.findForId(id.toString())

        if (!user) {
            return null
        }

        return user
    }
}
