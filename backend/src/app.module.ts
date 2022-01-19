import {Module} from '@nestjs/common'
import {AppController} from './app.controller'
import {AppService} from './app.service'
import {RefreshToken} from './entities/refresh-token.entity'
import {User} from './entities/user.entity'
import {AuthenticationModule} from './modules/authentication/authentication.module'
import {UsersModule} from './modules/users/users.module'
import {TypeOrmModule} from '@nestjs/typeorm'
import {Language} from './entities/language.entity'
import {LanguageModule} from './modules/language/language.module'
import {Word} from './entities/word.entity'
import {WordModule} from './modules/word/word.module'

@Module({
    imports: [
        UsersModule,
        AuthenticationModule,
        LanguageModule,
        WordModule,
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: 'articulation-postgres',
            port: 5432,
            username: 'admin',
            password: 'admin',
            database: 'articulation',
            entities: [User, RefreshToken, Language, Word],
            autoLoadEntities: true,
            synchronize: true,
        }),
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
