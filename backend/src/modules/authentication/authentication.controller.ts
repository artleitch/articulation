// app/modules/authentication/authentication.controller.ts

import {Body, Controller, Get, Post, Req, UnauthorizedException, UseGuards} from '@nestjs/common'

import {RegisterRequest, LoginRequest, RefreshRequest} from '../../requests'

import {User} from '../../entities/user.entity'
import * as moment from 'moment'

import {UsersService} from '../users/users.service'
import {TokensService} from './tokens.service'
import {JWTGuard} from './jwt.guard'

export interface AuthenticationPayload {
    user: User
    payload: {
        type: string
        accessToken: string
        refreshToken?: string
    }
}

@Controller('/api/auth')
export class AuthenticationController {
    private readonly users: UsersService
    private readonly tokens: TokensService

    public constructor(users: UsersService, tokens: TokensService) {
        this.users = users
        this.tokens = tokens
    }

    @Post('/register')
    public async register(@Body() body: RegisterRequest) {
        const user = await this.users.createUserFromRequest(body)

        const token = await this.tokens.generateAccessToken(user)
        const refresh = await this.tokens.generateRefreshToken(user, 60 * 60 * 24 * 30)

        const payload = this.buildResponsePayload(user, token, refresh)

        return {
            status: 'success',
            data: payload,
        }
    }

    @Post('/login')
    public async login(@Body() body: LoginRequest) {
        const {username, password} = body

        const user = await this.users.findForUsername(username)
        const valid = user ? await this.users.validateCredentials(user, password) : false

        if (!valid) {
            throw new UnauthorizedException('The login is invalid')
        }

        const token = await this.tokens.generateAccessToken(user)
        const refresh = await this.tokens.generateRefreshToken(user, 60 * 60 * 24 * 30)

        // TODO Get this value from environment
        const tokenExpiry = moment().add(5, 'minutes').toDate()
        const refreshTokenExpiry = moment()
            .add(60 * 60 * 24 * 30, 'seconds')
            .toDate()

        const payload = this.buildResponsePayload(user, token, refresh, tokenExpiry, refreshTokenExpiry)

        return {
            status: 'success',
            data: payload,
        }
    }

    @Post('/refresh')
    public async refresh(@Body() body: RefreshRequest) {
        const {user, token} = await this.tokens.createAccessTokenFromRefreshToken(body.refreshToken)
        const tokenExpiry = moment().add(5, 'minutes').toDate()

        const payload = this.buildResponsePayload(user, token, null, tokenExpiry)

        return {
            status: 'success',
            data: payload,
        }
    }

    @Get('/me')
    @UseGuards(JWTGuard)
    public async getUser(@Req() request) {
        const userId = request.user.id

        const user = await this.users.findForId(userId)

        return {
            status: 'success',
            data: user,
        }
    }

    private buildResponsePayload(
        user: User,
        accessToken: string,
        refreshToken?: string,
        accessTokenExpiry?: Date,
        refreshTokenExpiry?: Date
    ): AuthenticationPayload {
        return {
            user: user,
            payload: {
                type: 'bearer',
                accessToken,
                ...(refreshToken ? {refreshToken: refreshToken} : {}),
                ...(accessTokenExpiry ? {accessTokenExpiry: moment(accessTokenExpiry).format()} : {}),
                ...(refreshTokenExpiry ? {refreshTokenExpiry: moment(refreshTokenExpiry).format()} : {}),
            },
        }
    }
}
