import {Component, OnInit} from '@angular/core'
import {MatDialogRef} from '@angular/material/dialog'
import {Store} from '@ngrx/store'
import {User} from 'src/app/authentication/authentication.model'
import {Login} from 'src/app/authentication/store/authentication.actions'
import {AppState} from '../store/app.reducer'

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
    user: User = new User()
    constructor(public store: Store<AppState>, public dialogRef: MatDialogRef<LoginComponent>) {}

    ngOnInit() {
        this.store.select('authentication').subscribe((authentication) => {
            if (authentication.authenticated) {
                this.dialogRef.close()
            }
        })
    }

    onSubmit(): void {
        this.store.dispatch(new Login(this.user))
    }
}
