import {Component, Input, OnInit} from '@angular/core'
import {Store} from '@ngrx/store'
import {AppState} from 'src/app/shared/store/app.reducer'
import {DeleteWord} from 'src/app/shared/word/store/word.actions'
import {Word} from 'src/app/shared/word/word.model'

@Component({
    selector: 'app-word-card',
    templateUrl: './word-card.component.html',
    styleUrls: ['./word-card.component.scss'],
})
export class WordCardComponent {
    @Input()
    word?: Word

    constructor(private store: Store<AppState>) {}

    deleteWord = (word: Word) => {
        if (word.id) this.store.dispatch(new DeleteWord(word.id))
    }
}
