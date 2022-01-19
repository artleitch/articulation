import {Body, Controller, Delete, Get, Param, Post, UseGuards} from '@nestjs/common'
import {CreateLanguageRequest, UpdateLanguageRequest} from 'src/requests'
import {JWTGuard} from '../authentication/jwt.guard'
import {LanguageService} from './language.service'

@Controller('/language')
export class LanguageController {
    public constructor(private languageService: LanguageService) {}

    @Post('')
    @UseGuards(JWTGuard)
    public async createLanguage(@Body() body: CreateLanguageRequest): Promise<any> {
        return this.languageService.createLanguage(body)
    }

    // TODO Batch create language

    @Get('')
    @UseGuards(JWTGuard)
    public async getAllLanguages() {
        return this.languageService.getAllLanguages()
    }

    @Get('/:languageId')
    @UseGuards(JWTGuard)
    public async getLanguageById(@Param('languageId') languageId: string) {
        return this.languageService.getLanguageById(languageId)
    }

    @Post('/:languageId')
    @UseGuards(JWTGuard)
    public async updateLanguage(@Body() body: UpdateLanguageRequest, @Param('languageId') languageId) {
        return this.languageService.updateLanguage(languageId, body)
    }

    @Delete('/:languageId')
    @UseGuards(JWTGuard)
    public async deleteLanguage(@Param('languageId') languageId: string) {
        // find all words in this language
        // delete each word in this language
        // find all users who practice this language
        // update each user to remove this specific language
        // delete this language

        return this.languageService.deleteLanguage(languageId)
    }

    // TODO Batch delete language
}
