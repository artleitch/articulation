import {Component, OnInit} from '@angular/core'
import {Store} from '@ngrx/store'
import {Observable} from 'rxjs'
import {map} from 'rxjs/operators'
import {Logout} from 'src/app/shared/authentication/store/authentication.actions'
import {SetCurrentPracticeLanguage} from 'src/app/shared/language/store/language.actions'
import {AuthenticationState} from 'src/app/shared/authentication/store/authentication.reducer'
import {AppState} from '../store/app.reducer'
import {MatDialog} from '@angular/material/dialog'
import {LoginComponent} from '../login/login.component'
import {LanguageState} from '../language/store/language.reducer'
import {Language} from '../language/language.model'
import {MatSelectChange} from '@angular/material/select'
@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
    public authentication$: Observable<AuthenticationState>
    public languages$: Observable<LanguageState>
    public currentPracticeLanguage: Language | null = null

    constructor(private store: Store<AppState>, public dialog: MatDialog) {
        this.authentication$ = this.store.select('authentication')
        this.languages$ = this.store.select('language')

        this.languages$.subscribe((value) => {
            this.currentPracticeLanguage = value.currentPracticeLanguage
        })
    }

    logout = () => {
        this.store.dispatch(new Logout())
    }

    openLogin = () => {
        this.dialog.open(LoginComponent)
    }

    get username() {
        return this.authentication$.pipe(
            map((authentication) => {
                return authentication?.user?.username
            })
        )
    }

    get isAuthenticated() {
        return this.authentication$.pipe(
            map((authentication) => {
                return authentication?.authenticated
            })
        )
    }

    get practiceLanguages() {
        return this.languages$.pipe(
            map((languageState) => {
                return languageState.practiceLanguages
            })
        )
    }

    updatePracticeLanguage = (event: MatSelectChange) => {
        this.store.dispatch(new SetCurrentPracticeLanguage(event.value))
    }
}
