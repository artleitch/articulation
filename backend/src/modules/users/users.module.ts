import {Module} from '@nestjs/common'
import {SequelizeModule} from '@nestjs/sequelize'

import {User} from '../../entities/user.entity'

import {UsersService} from './users.service'
import {UsersRepository} from './users.repository'
import {TypeOrmModule} from '@nestjs/typeorm'
import {JWTGuard} from '../authentication/jwt.guard'
import {JwtStrategy} from '../authentication/jwt.strategy'
import {UsersController} from './users.controller'
import {LanguageService} from '../language/language.service'
import {Language} from 'src/entities/language.entity'

@Module({
    imports: [TypeOrmModule.forFeature([User]), TypeOrmModule.forFeature([Language])],
    providers: [UsersService, UsersRepository, JWTGuard, JwtStrategy, LanguageService],
    exports: [UsersService, UsersRepository],
    controllers: [UsersController],
})
export class UsersModule {}
