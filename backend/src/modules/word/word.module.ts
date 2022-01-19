import {Module} from '@nestjs/common'
import {TypeOrmModule} from '@nestjs/typeorm'
import {Language} from 'src/entities/language.entity'
import {User} from 'src/entities/user.entity'
import {Word} from 'src/entities/word.entity'
import {JWTGuard} from '../authentication/jwt.guard'
import {JwtStrategy} from '../authentication/jwt.strategy'
import {LanguageService} from '../language/language.service'
import {UsersRepository} from '../users/users.repository'
import {UsersService} from '../users/users.service'
import {WordController} from './word.controller'
import {WordService} from './word.service'

@Module({
    imports: [TypeOrmModule.forFeature([Word]), TypeOrmModule.forFeature([Language]), TypeOrmModule.forFeature([User])],
    providers: [WordService, JWTGuard, UsersRepository, JWTGuard, JwtStrategy, LanguageService, UsersService],
    exports: [WordService],
    controllers: [WordController],
})
export class WordModule {}
