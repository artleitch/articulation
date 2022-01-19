import {Component, OnInit} from '@angular/core'
import {Router} from '@angular/router'
import {Store} from '@ngrx/store'
import {map} from 'rxjs/operators'
import {AppState} from '../shared/store/app.reducer'
import {CreateWord} from '../shared/word/store/word.actions'
import {Word, WordTypeEnum} from '../shared/word/word.model'

@Component({
    selector: 'app-word',
    templateUrl: './word.component.html',
    styleUrls: ['./word.component.scss'],
})
export class WordComponent {
    word: Word
    wordTypes = Object.values(WordTypeEnum)
    constructor(private store: Store<AppState>, private router: Router) {
        this.word = {
            originWord: '',
            destinationWord: '',
            type: WordTypeEnum.NOUN,
            languageId: '',
        }
        this.languageId.subscribe((languageId) => {
            this.word.languageId = languageId?.id || ''
        })

        this.currentWord.subscribe((currentWord) => {
            if (currentWord) this.word = {...this.word, ...currentWord}
            if (this.word.id) {
                this.router.navigate(['word', this.word.id])
                // redirect to /word/:wordId for editing if needed
            }
        })
    }

    get languageId() {
        return this.store.select('language').pipe(map((state) => state.currentPracticeLanguage))
    }

    get currentWord() {
        return this.store.select('word').pipe(map((state) => state.currentWord))
    }

    onSubmit = () => {
        this.store.dispatch(new CreateWord(this.word))
    }
}
