import {Injectable} from '@angular/core'
import {Actions, createEffect, ofType} from '@ngrx/effects'
import {of} from 'rxjs'
import {switchMap, map, catchError} from 'rxjs/operators'
import {Language} from '../../language/language.model'
import {Word} from '../word.model'
import {WordService} from '../word.service'
import * as WordActions from './word.actions'
import {CreateWordPayload, GetWordsPayload} from './word.actions'

@Injectable()
export class WordEffects {
    constructor(private actions$: Actions, private wordService: WordService) {}

    createWord = createEffect(() => {
        return this.actions$.pipe(
            ofType(WordActions.CREATE_WORD),
            map((action: WordActions.CreateWord) => action.payload),
            switchMap((payload) => {
                return this.wordService.createWord(payload).pipe(
                    map((response: Word) => {
                        return new WordActions.CreateWordSuccess(response)
                    })
                )
            }),
            catchError(() => {
                return of(new WordActions.CreateWordFailure())
            })
        )
    })

    createWordSuccess = createEffect(() => {
        return this.actions$.pipe(
            ofType(WordActions.CREATE_WORD_SUCCESS),
            map(() => {
                return new WordActions.UpdateLoading(false)
            })
        )
    })

    createWordFailure = createEffect(() => {
        return this.actions$.pipe(
            ofType(WordActions.CREATE_WORD_FAILURE),
            map(() => {
                return new WordActions.UpdateLoading(false)
            })
        )
    })

    getWords = createEffect(() => {
        return this.actions$.pipe(
            ofType(WordActions.GET_WORDS),
            map((action: WordActions.GetWords) => action.payload),
            switchMap((payload) => {
                return this.wordService.getWords(payload).pipe(
                    map((response) => {
                        return new WordActions.GetWordsSuccess(response)
                    })
                )
            }),
            catchError(() => {
                return of(new WordActions.GetWordsFailure())
            })
        )
    })

    getWordsSuccess = createEffect(() => {
        return this.actions$.pipe(
            ofType(WordActions.GET_WORDS_SUCCESS),
            map(() => {
                return new WordActions.UpdateLoading(false)
            })
        )
    })

    getWordsFailure = createEffect(() => {
        return this.actions$.pipe(
            ofType(WordActions.GET_WORDS_FAILURE),
            map(() => {
                return new WordActions.UpdateLoading(false)
            })
        )
    })
}
