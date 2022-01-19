import {Action} from '@ngrx/store'
import {Language} from '../../language/language.model'
import {User} from '../../user/user.model'
import {Word, WordTypeEnum} from '../word.model'

export const CREATE_WORD = '[WORD] CREATE_WORD'
export const CREATE_WORD_SUCCESS = '[WORD] CREATE_WORD_SUCCESS'
export const CREATE_WORD_FAILURE = '[WORD] CREATE_WORD_FAILURE'
export const GET_WORD = '[WORD] GET_WORD'
export const GET_WORD_SUCCESS = '[WORD] GET_WORD_SUCCESS'
export const GET_WORD_FAILURE = '[WORD] GET_WORD_FAILURE'
export const GET_WORDS = '[WORD] GET_WORDS'
export const GET_WORDS_SUCCESS = '[WORD] GET_WORDS_SUCCESS'
export const GET_WORDS_FAILURE = '[WORD] GET_WORDS_FAILURE'
export const UPDATE_WORD = '[WORD] UPDATE_WORD'
export const UPDATE_WORD_SUCCESS = '[WORD] UPDATE_WORD_SUCCESS'
export const UPDATE_WORD_FAILURE = '[WORD] UPDATE_WORD_FAILURE'
export const DELETE_WORD = '[WORD] DELETE_WORD'
export const DELETE_WORD_SUCCESS = '[WORD] DELETE_WORD_SUCCESS'
export const DELETE_WORD_FAILURE = '[WORD] DELETE_WORD_FAILURE'
export const UPDATE_LOADING = '[WORD] UPDATE_LOADING'

export interface CreateWordPayload {
    originWord: string
    destinationWord: string
    languageId: string
    type: WordTypeEnum
}

export interface GetWordsPayload {
    types?: WordTypeEnum[]
    languageIds?: string[]
}

export class CreateWord implements Action {
    readonly type = CREATE_WORD

    constructor(public payload: CreateWordPayload) {}
}

export class CreateWordSuccess implements Action {
    readonly type = CREATE_WORD_SUCCESS

    constructor(public payload: Word) {}
}

export class CreateWordFailure implements Action {
    readonly type = CREATE_WORD_FAILURE

    constructor() {}
}

export class GetWord implements Action {
    readonly type = GET_WORD

    constructor() {}
}

export class GetWordSuccess implements Action {
    readonly type = GET_WORD_SUCCESS

    constructor() {}
}

export class GetWordFailure implements Action {
    readonly type = GET_WORD_FAILURE

    constructor() {}
}

export class GetWords implements Action {
    readonly type = GET_WORDS

    constructor(public payload: GetWordsPayload) {}
}

export class GetWordsSuccess implements Action {
    readonly type = GET_WORDS_SUCCESS

    constructor(public payload: Word[]) {}
}

export class GetWordsFailure implements Action {
    readonly type = GET_WORDS_FAILURE

    constructor() {}
}

export class UpdateWord implements Action {
    readonly type = UPDATE_WORD

    constructor() {}
}

export class UpdateWordSuccess implements Action {
    readonly type = UPDATE_WORD_SUCCESS

    constructor() {}
}

export class UpdateWordFailure implements Action {
    readonly type = UPDATE_WORD_FAILURE

    constructor() {}
}

export class DeleteWord implements Action {
    readonly type = DELETE_WORD

    constructor() {}
}

export class DeleteWordSuccess implements Action {
    readonly type = DELETE_WORD_SUCCESS

    constructor() {}
}

export class DeleteWordFailure implements Action {
    readonly type = DELETE_WORD_FAILURE

    constructor() {}
}

export class UpdateLoading implements Action {
    readonly type = UPDATE_LOADING

    constructor(public payload: boolean) {}
}

export type WordActions =
    | CreateWord
    | CreateWordSuccess
    | CreateWordFailure
    | GetWord
    | GetWordSuccess
    | GetWordFailure
    | GetWords
    | GetWordsSuccess
    | GetWordsFailure
    | UpdateWord
    | UpdateWordSuccess
    | UpdateWordFailure
    | DeleteWord
    | DeleteWordSuccess
    | DeleteWordFailure
    | UpdateLoading
