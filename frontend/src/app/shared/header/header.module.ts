import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {HeaderComponent} from './header.component'
import {MatSelectModule} from '@angular/material/select'
import {LoginModule} from '../login/login.module'
import {MatCommonModule} from '@angular/material/core'
import {MatDialogModule} from '@angular/material/dialog'

@NgModule({
    imports: [CommonModule, MatSelectModule, MatCommonModule, MatDialogModule],
    declarations: [HeaderComponent],
    exports: [HeaderComponent],
})
export class HeaderModule {}
