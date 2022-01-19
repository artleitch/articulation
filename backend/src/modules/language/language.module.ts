import {Module} from '@nestjs/common'
import {TypeOrmModule} from '@nestjs/typeorm'
import {Language} from 'src/entities/language.entity'
import {JWTGuard} from '../authentication/jwt.guard'
import {JwtStrategy} from '../authentication/jwt.strategy'
import {LanguageController} from './language.controller'
import {LanguageService} from './language.service'

@Module({
    imports: [TypeOrmModule.forFeature([Language])],
    providers: [LanguageService, JWTGuard],
    exports: [LanguageService],
    controllers: [LanguageController],
})
export class LanguageModule {}
