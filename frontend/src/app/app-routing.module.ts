import {NgModule} from '@angular/core'
import {RouterModule, Routes} from '@angular/router'
import {AuthenticationComponent} from './authentication/authentication.component'
import {LoginComponent} from './authentication/login/login.component'

const routes: Routes = [
    {path: 'login', component: LoginComponent},
    {path: '', component: AuthenticationComponent},
    {path: '**', redirectTo: '/'},
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
