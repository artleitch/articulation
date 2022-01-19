import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {WordComponent} from './word.component'
import {FormsModule} from '@angular/forms'
import {MatButtonModule} from '@angular/material/button'
import {MatFormFieldModule} from '@angular/material/form-field'
import {MatInputModule} from '@angular/material/input'
import {RouterModule} from '@angular/router'
import {MatSelectModule} from '@angular/material/select'

@NgModule({
    imports: [
        CommonModule,
        MatFormFieldModule,
        MatInputModule,
        FormsModule,
        RouterModule,
        MatButtonModule,
        MatSelectModule,
        RouterModule,
    ],
    declarations: [WordComponent],
})
export class WordModule {}
