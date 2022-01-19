import {Word} from '../word.model'
import * as WordActions from './word.actions'

export interface WordState {
    words: Word[]
    currentWord: Word | null
    loading: boolean
}

const initialState: WordState = {
    words: [],
    currentWord: null,
    loading: false,
}

export const wordReducer: (state: WordState, action: WordActions.WordActions) => void = (
    state = initialState,
    action: WordActions.WordActions
) => {
    switch (action.type) {
        case WordActions.CREATE_WORD: {
            return {...state}
        }

        case WordActions.CREATE_WORD_SUCCESS: {
            return {...state, currentWord: action.payload}
        }

        case WordActions.GET_WORDS: {
            return {...state}
        }

        case WordActions.GET_WORDS_SUCCESS: {
            return {...state, words: action.payload}
        }

        case WordActions.UPDATE_LOADING: {
            return {...state, loading: action.payload}
        }

        default:
            return {...state}
    }
}
