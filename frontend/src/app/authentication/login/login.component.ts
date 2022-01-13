import {Component, OnInit} from '@angular/core'
import {AppState} from 'src/app/shared/store/app.reducer'
import {User} from '../authentication.model'
import {Store} from '@ngrx/store'
import {Login} from '../store/authentication.actions'

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
    user: User = new User()
    constructor(private store: Store<AppState>) {}

    ngOnInit() {}

    onSubmit(): void {
        this.store.dispatch(new Login(this.user))
    }
}
