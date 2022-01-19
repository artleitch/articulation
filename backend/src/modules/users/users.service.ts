import {UnprocessableEntityException, Injectable} from '@nestjs/common'
import {compare, hash} from 'bcrypt'

import {RegisterRequest} from '../../requests'

import {User} from '../../entities/user.entity'

import {UsersRepository} from '../users/users.repository'
import {Repository} from 'typeorm'
import {InjectRepository} from '@nestjs/typeorm'

@Injectable()
export class UsersService {
    public constructor(
        @InjectRepository(User) private users: Repository<User>,
        private userRespository: UsersRepository
    ) {}

    public async validateCredentials(user: User, password: string): Promise<boolean> {
        return compare(password, user.password)
    }

    public async createUserFromRequest(request: RegisterRequest): Promise<User> {
        const {username, password} = request
        const existingFromUsername = await this.findForUsername(request.username)

        const user = new User()
        user.username = username
        user.password = await hash(password, 10)

        if (existingFromUsername) {
            throw new UnprocessableEntityException('Username already in use')
        }
        const createdUser = this.users.save(user)
        return createdUser
    }

    public async findForId(id: string): Promise<User | null> {
        return this.userRespository.findForId(id)
    }

    public async findForUsername(username: string): Promise<User | null> {
        return this.userRespository.findForUsername(username)
    }
}
