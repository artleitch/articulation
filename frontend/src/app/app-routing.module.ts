import {NgModule} from '@angular/core'
import {RouterModule, Routes} from '@angular/router'
import {AuthenticationComponent} from './authentication/authentication.component'
import {LoginComponent} from './shared/login/login.component'

const routes: Routes = [
    {path: '', component: AuthenticationComponent},
    {path: '**', redirectTo: '/'},
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
