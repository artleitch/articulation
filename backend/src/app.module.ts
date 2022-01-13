import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RefreshToken } from './models/refresh-token.model';
import { User } from './models/user.model';
import { AuthenticationModule } from './modules/authentication/authentication.module';
import { UsersModule } from './modules/users/users.module';

@Module({
  imports: [SequelizeModule.forRoot({
    dialect: 'postgres',
    host: 'articulation-postgres',
    port: 5432,
    username: 'admin',
    password: 'admin',
    database: 'articulation',
    models: [User, RefreshToken],
    autoLoadModels: true,
    synchronize: true,
  }), UsersModule, AuthenticationModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
