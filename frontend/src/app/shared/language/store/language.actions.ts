import {Action} from '@ngrx/store'
import {Language} from '../language.model'

export const GET_ALL_LANGUAGES = '[LANGUAGE] GET_ALL_LANGUAGES'
export const GET_ALL_LANGUAGES_SUCCESS = '[LANGUAGE] GET_ALL_LANGUAGES_SUCCESS'
export const GET_ALL_LANGUAGES_FAILURE = '[LANGUAGE] GET_ALL_LANGUAGES_FAILURE'
export const GET_PRACTICE_LANGUAGES = '[LANGUAGE] GET_PRACTICE_LANGUAGES'
export const GET_PRACTICE_LANGUAGES_SUCCESS = '[LANGUAGE] GET_PRACTICE_LANGUAGES_SUCCESS'
export const GET_PRACTICE_LANGUAGES_FAILURE = '[LANGUAGE] GET_PRACTICE_LANGUAGES_FAILURE'
export const SET_CURRENT_PRACTICE_LANGUAGE = '[LANGUAGE] SET_CURRENT_PRACTICE_LANGUAGE'

export class GetPracticeLanguages implements Action {
    readonly type = GET_PRACTICE_LANGUAGES

    constructor() {}
}
export class GetPracticeLanguagesSuccess implements Action {
    readonly type = GET_PRACTICE_LANGUAGES_SUCCESS

    constructor(public payload: Language[]) {}
}
export class GetPracticeLanguagesFailure implements Action {
    readonly type = GET_PRACTICE_LANGUAGES_FAILURE

    constructor(public payload: Language) {}
}
export class GetAllLanguages implements Action {
    readonly type = GET_ALL_LANGUAGES

    constructor() {}
}
export class GetAllLanguagesSuccess implements Action {
    readonly type = GET_ALL_LANGUAGES_SUCCESS

    constructor(public payload: Language[]) {}
}
export class GetAllLanguagesFailure implements Action {
    readonly type = GET_ALL_LANGUAGES_FAILURE

    constructor(public payload: Language) {}
}
export class SetCurrentPracticeLanguage implements Action {
    readonly type = SET_CURRENT_PRACTICE_LANGUAGE

    constructor(public payload: Language) {}
}

export type LanguageActions =
    | GetPracticeLanguages
    | GetPracticeLanguagesSuccess
    | GetPracticeLanguagesFailure
    | GetAllLanguages
    | GetAllLanguagesSuccess
    | GetAllLanguagesFailure
    | SetCurrentPracticeLanguage
