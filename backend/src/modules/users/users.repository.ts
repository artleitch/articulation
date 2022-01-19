// app/modules/users/users.repository.ts

import {Injectable} from '@nestjs/common'
import {InjectModel} from '@nestjs/sequelize'
import {InjectRepository} from '@nestjs/typeorm'
import {hash} from 'bcrypt'
import {Repository} from 'typeorm'
import {User} from '../../entities/user.entity'

@Injectable()
export class UsersRepository {
    public constructor(@InjectRepository(User) private users: Repository<User>) {
        this.users = users
    }

    public async findForId(id: string): Promise<User | null> {
        return this.users.findOne({
            where: {
                id,
            },
        })
    }

    public async findForUsername(username: string): Promise<User | null> {
        return this.users.findOne({
            where: {
                username: username.toLowerCase().trim(),
            },
        })
    }

    public async create(username: string, password: string): Promise<User> {
        const user = new User()

        user.username = username
        user.password = await hash(password, 10)

        return this.users.create(user)
    }
}
