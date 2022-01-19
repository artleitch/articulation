import {NgModule} from '@angular/core'
import {RouterModule, Routes} from '@angular/router'
import {AdminComponent} from './admin/admin.component'
import {ConjugationsComponent} from './conjugations/conjugations.component'
import {DashboardComponent} from './dashboard/dashboard.component'
import {FlashcardsComponent} from './flashcards/flashcards.component'
import {GendersComponent} from './genders/genders.component'
import {WordComponent} from './word/word.component'

const routes: Routes = [
    {path: '', component: DashboardComponent},
    {path: 'conjugations', component: ConjugationsComponent},
    {path: 'genders', component: GendersComponent},
    {path: 'flashcards', component: FlashcardsComponent},
    {path: 'admin', component: AdminComponent},
    {path: 'word', component: WordComponent},
    {path: 'word/:wordId', component: WordComponent},
    {path: '**', redirectTo: '/'},
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
