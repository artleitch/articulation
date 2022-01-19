import {Body, Controller, Delete, Get, Param, Post, Query, Req, UseGuards} from '@nestjs/common'
import {WordTypeEnum} from 'src/entities/word.entity'
import {CreateWordRequest} from 'src/requests'
import {JWTGuard} from '../authentication/jwt.guard'
import {CreateWordOptions, GetWordsOptions, WordService} from './word.service'

@Controller('/word')
export class WordController {
    public constructor(private wordService: WordService) {}

    @Post('')
    @UseGuards(JWTGuard)
    public async createWord(@Body() body: CreateWordRequest, @Req() request): Promise<any> {
        const wordOptions = {...body} as CreateWordOptions

        wordOptions.userId = request.user.id
        return this.wordService.createWord(wordOptions)
    }
    @Get(':wordId')
    @UseGuards(JWTGuard)
    public async getWordById(@Param('wordId') wordId: string): Promise<any> {
        return this.wordService.getWordById(wordId)
    }
    @Get('')
    @UseGuards(JWTGuard)
    public async getWords(
        @Query('types') types: WordTypeEnum[],
        @Query('languageIds') languageIds: string[],
        @Req() request
    ): Promise<any> {
        const userIds = [request.user.id]
        const options: GetWordsOptions = {
            userIds,
        }
        if (languageIds) options.languageIds = Array.isArray(languageIds) ? languageIds : [languageIds]
        if (types) options.types = Array.isArray(types) ? types : [types]
        return this.wordService.getWords(options)
    }
    @Post('')
    public async updateWord(): Promise<any> {
        return Promise.resolve()
    }
    @Delete('')
    public async deleteWord(): Promise<any> {
        return Promise.resolve()
    }
}
