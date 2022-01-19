import {Injectable} from '@angular/core'
import {Actions, createEffect, ofType} from '@ngrx/effects'
import {LanguageService} from '../language.service'
import {map, switchMap} from 'rxjs/operators'
import * as LanguageActions from './language.actions'
import {Language} from '../language.model'
import {UserService} from '../../user/user.service'
import {User} from '../../authentication/authentication.model'

@Injectable()
export class LanguageEffects {
    GetAllLanguages = createEffect(() => {
        return this.actions$.pipe(
            ofType(LanguageActions.GET_ALL_LANGUAGES),
            switchMap((payload: any) => {
                return this.languageService.getAllLanguages().pipe(
                    map((response: Language[]) => {
                        return new LanguageActions.GetAllLanguagesSuccess(response)
                    })
                )
            })
        )
    })

    GetPracticeLanguages = createEffect(() => {
        return this.actions$.pipe(
            ofType(LanguageActions.GET_PRACTICE_LANGUAGES),
            switchMap((payload: any) => {
                return this.userService.getCurrentUser().pipe(
                    map((response: User) => {
                        return new LanguageActions.GetPracticeLanguagesSuccess(response.practiceLanguages || [])
                    })
                )
            })
        )
    })

    constructor(
        private actions$: Actions,
        private languageService: LanguageService,
        private userService: UserService
    ) {}
}
