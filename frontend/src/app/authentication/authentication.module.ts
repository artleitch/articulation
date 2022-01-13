import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {AuthenticationComponent} from './authentication.component'
import {RouterModule} from '@angular/router'
import {FormsModule} from '@angular/forms'
import {AuthenticationService} from './authentication.service'
import {HttpClientModule} from '@angular/common/http'

@NgModule({
    imports: [CommonModule, RouterModule, FormsModule, HttpClientModule],
    declarations: [AuthenticationComponent],
    providers: [],
})
export class AuthenticationModule {}
