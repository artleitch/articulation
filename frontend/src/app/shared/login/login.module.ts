import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {LoginComponent} from './login.component'
import {MatFormFieldModule} from '@angular/material/form-field'
import {MatInputModule} from '@angular/material/input'
import {FormsModule} from '@angular/forms'
import {RouterModule} from '@angular/router'
import {MatButtonModule} from '@angular/material/button'

@NgModule({
    imports: [CommonModule, MatFormFieldModule, MatInputModule, FormsModule, RouterModule, MatButtonModule],
    declarations: [LoginComponent],
    exports: [LoginComponent],
})
export class LoginModule {}
