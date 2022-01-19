import {Component, OnInit} from '@angular/core'
import {Store} from '@ngrx/store'
import {lang} from 'moment'
import {Observable} from 'rxjs'
import {map, take} from 'rxjs/operators'
import {User} from '../shared/authentication/authentication.model'
import {AuthenticationState} from '../shared/authentication/store/authentication.reducer'
import {GetPracticeLanguages, GetPracticeLanguagesSuccess} from '../shared/language/store/language.actions'
import {LanguageEffects} from '../shared/language/store/language.effects'
import {LanguageState} from '../shared/language/store/language.reducer'
import {AppState} from '../shared/store/app.reducer'
import {UserService} from '../shared/user/user.service'

@Component({
    selector: 'app-admin',
    templateUrl: './admin.component.html',
    styleUrls: ['./admin.component.scss'],
})
export class AdminComponent {
    user: User = {}
    authentication$: Observable<AuthenticationState> | null = null
    language$: Observable<LanguageState> | null = null

    constructor(private store: Store<AppState>, private userService: UserService) {
        this.authentication$ = this.store.select('authentication')
        this.language$ = this.store.select('language')

        this.authentication$.subscribe((authentication) => {
            this.user.username = authentication.user?.username
            this.user.id = authentication.user?.id
        })

        this.language$.subscribe((language) => {
            this.user.practiceLanguages = [...language.practiceLanguages]
        })
    }

    get languages() {
        return this.language$?.pipe(map((languages) => languages.languages))
    }

    compare = (o1: any, o2: any) => {
        return o1.id === o2.id
    }

    onSubmit = () => {
        const updatedUser: any = {...this.user}
        updatedUser.practiceLanguageIds = updatedUser.practiceLanguages?.map((a: any) => a.id)
        this.userService.updateUser(updatedUser).subscribe(() => {
            this.store.dispatch(new GetPracticeLanguages())
        })
    }
}
