import {Body, Controller, Delete, Get, Param, Post, Req, UseGuards} from '@nestjs/common'
import {InjectRepository} from '@nestjs/typeorm'
import {User} from 'src/entities/user.entity'
import {CreateLanguageRequest, UpdateLanguageRequest, UpdateUserRequest} from 'src/requests'
import {Repository} from 'typeorm'
import {JWTGuard} from '../authentication/jwt.guard'
import {LanguageService} from '../language/language.service'
import {UsersService} from './users.service'

@Controller('/user')
export class UsersController {
    public constructor(
        private usersService: UsersService,
        private languageService: LanguageService,
        @InjectRepository(User) private users: Repository<User>
    ) {}

    @Get('')
    @UseGuards(JWTGuard)
    public async getCurrentUser(@Req() request) {
        const userId = request.user.id
        return this.usersService.findForId(userId)
    }

    @Get('/:userId')
    @UseGuards(JWTGuard)
    public async getUser(@Param('userId') userId) {
        return this.usersService.findForId(userId)
    }

    @Post('/:userId')
    @UseGuards(JWTGuard)
    public async updateUser(@Req() request, @Param('userId') userId, @Body() body: UpdateUserRequest) {
        console.log('REQUEST', request)
        console.log('USER ID', userId)
        if (userId !== request.user.id) throw new Error("You don't have permission to edit this user")
        const languages = await Promise.all(
            body.practiceLanguageIds.map((id) => {
                return this.languageService.getLanguageById(id)
            })
        )
        const user = await this.usersService.findForId(userId)
        user.practiceLanguages = languages
        return this.users.save(user)
    }
}
