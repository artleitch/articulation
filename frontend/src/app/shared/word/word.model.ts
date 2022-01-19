import {Language} from '../language/language.model'

export interface Word {
    id?: string
    originWord: string
    destinationWord: string
    language: Partial<Language>
    type: WordTypeEnum
}

export enum WordTypeEnum {
    NOUN = 'noun',
    ADJECTIVE = 'adjective',
    PRONOUN = 'pronoun',
    VERB = 'verb',
}

export interface Noun extends Word {}
