import {Component, OnInit} from '@angular/core'
import {Store} from '@ngrx/store'
import {lang} from 'moment'
import {Observable} from 'rxjs'
import {map, take} from 'rxjs/operators'
import {AppState} from '../shared/store/app.reducer'
import {GetWords, GetWordsPayload} from '../shared/word/store/word.actions'
import {WordState} from '../shared/word/store/word.reducer'
import {WordTypeEnum} from '../shared/word/word.model'

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
    public words$: Observable<WordState>
    private currentPraciceLanguage: string = ''
    constructor(private store: Store<AppState>) {
        this.store.select('language').subscribe((languageState) => {
            if (
                languageState.currentPracticeLanguage?.id &&
                languageState.currentPracticeLanguage?.id !== this.currentPraciceLanguage
            ) {
                this.currentPraciceLanguage = languageState.currentPracticeLanguage?.id || ''
                const options: GetWordsPayload = {}
                if (languageState.currentPracticeLanguage?.id)
                    options.languageIds = [languageState.currentPracticeLanguage.id]
                this.store.dispatch(new GetWords(options))
            }
        })
        this.words$ = this.store.select('word')
    }

    get words() {
        return this.words$.pipe(
            map((wordState) => {
                return wordState.words.map((word) => {
                    return {
                        originWord: word.originWord,
                        destinationWord: word.destinationWord,
                    }
                })
            })
        )
    }
}
