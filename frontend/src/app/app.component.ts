import {Component} from '@angular/core'
import {AppState} from './shared/store/app.reducer'
import {Store} from '@ngrx/store'
import {Observable} from 'rxjs'
import {AuthenticationState} from './shared/authentication/store/authentication.reducer'
import {RefreshToken} from './shared/authentication/store/authentication.actions'
import {AuthenticationService} from './shared/authentication/authentication.service'
import {filter} from 'rxjs/operators'
import {GetAllLanguages, GetPracticeLanguages} from './shared/language/store/language.actions'

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent {
    authentication$: Observable<AuthenticationState>
    constructor(private store: Store<AppState>, private authService: AuthenticationService) {
        this.authentication$ = this.store.select('authentication')
        this.authService.backgroundLogin()
        this.store.dispatch(new GetAllLanguages())
    }
}
