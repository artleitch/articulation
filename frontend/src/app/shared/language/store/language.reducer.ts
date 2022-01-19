import {Language} from '../language.model'
import * as LanguageActions from './language.actions'

export interface LanguageState {
    languages: Language[]
    practiceLanguages: Language[]
    currentPracticeLanguage: Language | null
}

const initialState: LanguageState = {
    languages: [],
    practiceLanguages: [],
    currentPracticeLanguage: null,
}

export const languageReducer: (state: LanguageState, action: LanguageActions.LanguageActions) => void = (
    state = initialState,
    action: LanguageActions.LanguageActions
) => {
    switch (action.type) {
        case LanguageActions.GET_ALL_LANGUAGES: {
            return {...state}
        }

        case LanguageActions.GET_ALL_LANGUAGES_SUCCESS: {
            return {...state, languages: [...action.payload]}
        }

        case LanguageActions.GET_ALL_LANGUAGES_FAILURE: {
            return {...state, languages: [], practiceLanguages: [], currentPracticeLanguage: null}
        }
        case LanguageActions.GET_PRACTICE_LANGUAGES: {
            return {...state}
        }

        case LanguageActions.GET_PRACTICE_LANGUAGES_SUCCESS: {
            return {...state, practiceLanguages: [...action.payload], currentPracticeLanguage: action.payload[0]}
        }

        case LanguageActions.GET_PRACTICE_LANGUAGES_FAILURE: {
            return {...state, languages: [], practiceLanguages: [], currentPracticeLanguage: null}
        }

        case LanguageActions.SET_CURRENT_PRACTICE_LANGUAGE: {
            return {...state, currentPracticeLanguage: action.payload}
        }

        default:
            return {...state}
    }
}
