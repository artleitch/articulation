export interface Word {
    id?: string
    originWord: string
    destinationWord: string
    languageId: string
    type: WordTypeEnum
}

export enum WordTypeEnum {
    NOUN = 'noun',
    ADJECTIVE = 'adjective',
    PRONOUN = 'pronoun',
    VERB = 'verb',
}

export interface Noun extends Word {}
