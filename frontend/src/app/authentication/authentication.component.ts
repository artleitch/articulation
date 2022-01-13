import {Component, OnInit} from '@angular/core'
import {AppState} from '../shared/store/app.reducer'
import {Store} from '@ngrx/store'
import {Logout} from './store/authentication.actions'
import {AuthenticationService} from './authentication.service'

@Component({
    selector: 'app-authentication',
    templateUrl: './authentication.component.html',
    styleUrls: ['./authentication.component.scss'],
})
export class AuthenticationComponent implements OnInit {
    constructor(private store: Store<AppState>, private authService: AuthenticationService) {}

    ngOnInit() {}

    logout() {
        this.store.dispatch(new Logout())
    }

    getStatus() {
        this.authService.getStatus().subscribe()
    }
}
