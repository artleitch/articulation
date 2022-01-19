import {Module} from '@nestjs/common'
import {JwtModule} from '@nestjs/jwt'
import {SequelizeModule} from '@nestjs/sequelize'

import {UsersModule} from '../users/users.module'

import {RefreshToken} from '../../entities/refresh-token.entity'

import {TokensService} from './tokens.service'
import {RefreshTokensRepository} from './refresh-tokens.repository'

import {AuthenticationController} from './authentication.controller'
import {JWTGuard} from './jwt.guard'
import {JwtStrategy} from './jwt.strategy'
import {TypeOrmModule} from '@nestjs/typeorm'

@Module({
    imports: [
        TypeOrmModule.forFeature([RefreshToken]),
        JwtModule.register({
            secret: '<SECRET KEY>',
            signOptions: {
                expiresIn: '5m',
            },
        }),
        UsersModule,
    ],
    controllers: [AuthenticationController],
    providers: [TokensService, RefreshTokensRepository, JWTGuard, JwtStrategy],
})
export class AuthenticationModule {}
