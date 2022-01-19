import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {DashboardComponent} from './dashboard.component'
import {WordCardComponent} from './word-card/word-card.component'
import {RouterModule} from '@angular/router'

@NgModule({
    imports: [CommonModule, RouterModule],
    declarations: [DashboardComponent, WordCardComponent],
    exports: [DashboardComponent],
})
export class DashboardModule {}
