import {Component, OnInit} from '@angular/core'
import {Store} from '@ngrx/store'
import {Observable} from 'rxjs'
import {map} from 'rxjs/operators'
import {Logout} from 'src/app/authentication/store/authentication.actions'
import {AuthenticationState} from 'src/app/authentication/store/authentication.reducer'
import {AppState} from '../store/app.reducer'
import {MatDialog} from '@angular/material/dialog'
import {LoginComponent} from '../login/login.component'

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
    public authentication$: Observable<AuthenticationState>
    public practiceLanguages = [
        {
            label: 'German',
            value: 'de',
        },
        {
            label: 'French',
            value: 'fr',
        },
    ]

    constructor(private store: Store<AppState>, public dialog: MatDialog) {
        this.authentication$ = this.store.select('authentication')
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
}
