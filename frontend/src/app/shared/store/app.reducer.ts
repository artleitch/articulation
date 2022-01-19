import {ActionReducerMap} from '@ngrx/store'

import * as fromAuthentication from '../authentication/store/authentication.reducer'
import * as fromLanguage from '../language/store/language.reducer'
import * as fromWord from '../word/store/word.reducer'

export interface AppState {
    authentication: fromAuthentication.AuthenticationState
    language: fromLanguage.LanguageState
    word: fromWord.WordState
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const appReducer: ActionReducerMap<any, any> = {
    // This is where we would add more definitions of stores / reducers
    authentication: fromAuthentication.authenticationReducer,
    language: fromLanguage.languageReducer,
    word: fromWord.wordReducer,
}
