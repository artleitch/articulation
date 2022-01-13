import {Component} from '@angular/core'
import {AppState} from './shared/store/app.reducer'
import {Store} from '@ngrx/store'
import {Observable} from 'rxjs'
import {AuthenticationState} from './authentication/store/authentication.reducer'
import {RefreshToken} from './authentication/store/authentication.actions'
import {AuthenticationService} from './authentication/authentication.service'

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
    }
}
