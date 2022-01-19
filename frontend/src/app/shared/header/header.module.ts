import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {HeaderComponent} from './header.component'
import {MatSelectModule} from '@angular/material/select'
import {MatCommonModule} from '@angular/material/core'
import {MatDialogModule} from '@angular/material/dialog'
import {RouterModule} from '@angular/router'

@NgModule({
    imports: [CommonModule, MatSelectModule, MatCommonModule, MatDialogModule, RouterModule],
    declarations: [HeaderComponent],
    exports: [HeaderComponent],
})
export class HeaderModule {}
