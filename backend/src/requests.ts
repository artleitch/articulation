import {IsArray, IsNotEmpty, MinLength} from 'class-validator'
import {Language} from './entities/language.entity'
import {WordTypeEnum} from './entities/word.entity'

export class LoginRequest {
    @IsNotEmpty({message: 'A username is required'})
    readonly username: string

    @IsNotEmpty({message: 'A password is required to login'})
    readonly password: string
}

export class RegisterRequest {
    @IsNotEmpty({message: 'An username is required'})
    readonly username: string

    @IsNotEmpty({message: 'A password is required'})
    @MinLength(6, {message: 'Your password must be at least 6 characters'})
    readonly password: string
}

export class RefreshRequest {
    @IsNotEmpty({message: 'The refresh token is required'})
    readonly refreshToken: string
}

export class CreateLanguageRequest {
    @IsNotEmpty({message: 'The language code is required'})
    readonly languageCode: string
}

export class UpdateLanguageRequest {
    @IsNotEmpty({message: 'The language code is required'})
    readonly languageCode: string
    @IsNotEmpty({message: 'The language id is required'})
    readonly id: string
}

export class UpdateUserRequest {
    @IsArray()
    readonly practiceLanguageIds: string[]
}

export class CreateWordRequest {
    @IsNotEmpty({message: 'The origin word is required'})
    readonly originWord: string

    @IsNotEmpty({message: 'The destination word is required'})
    readonly destinationWord: string

    @IsNotEmpty({message: 'The language is required'})
    readonly language: Partial<Language>

    @IsNotEmpty({message: 'The word type is required'})
    readonly type: WordTypeEnum
}

interface WordLanguage extends Partial<Language> {
    id: string
}

export class UpdateWordRequest {
    @IsNotEmpty({message: 'The word id is required'})
    readonly id: string

    readonly language: WordLanguage

    readonly originWord: string
    readonly destinationWord: string
    readonly type: WordTypeEnum
}
