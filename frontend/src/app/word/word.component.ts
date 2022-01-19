import {Component, OnDestroy, OnInit} from '@angular/core'
import {ActivatedRoute, ActivatedRouteSnapshot, Params, Router} from '@angular/router'
import {Store} from '@ngrx/store'
import {Observable, Subscriber, Subscription} from 'rxjs'
import {map, take} from 'rxjs/operators'
import {AppState} from '../shared/store/app.reducer'
import {CreateWord, GetWord, UpdateWord} from '../shared/word/store/word.actions'
import {Word, WordTypeEnum} from '../shared/word/word.model'
import {WordService} from '../shared/word/word.service'

@Component({
    selector: 'app-word',
    templateUrl: './word.component.html',
    styleUrls: ['./word.component.scss'],
})
export class WordComponent implements OnDestroy {
    word: Word
    wordTypes = Object.values(WordTypeEnum)
    langSub$: Subscription
    wordSub$: Subscription

    constructor(private store: Store<AppState>, private router: Router, private route: ActivatedRoute) {
        this.word = {
            originWord: '',
            destinationWord: '',
            type: WordTypeEnum.NOUN,
            language: {},
        }
        this.langSub$ = this.language.subscribe((language) => {
            if (language) this.word.language = language
        })
        this.wordSub$ = this.currentWord.subscribe((currentWord) => {
            if (currentWord) this.word = {...this.word, ...currentWord}
            if (this.word.id) {
                this.router.navigate(['word', this.word.id])
            }
        })

        const currentWordId = this.route.snapshot.paramMap.get('wordId')
        if (currentWordId) {
            this.store.dispatch(new GetWord(currentWordId))
        }
    }

    get language() {
        return this.store.select('language').pipe(map((state) => state.currentPracticeLanguage))
    }

    get currentWord() {
        return this.store.select('word').pipe(map((state) => state.currentWord))
    }

    onSubmit = () => {
        if (this.word.id) {
            console.log('WORD', this.word)
            this.store.dispatch(new UpdateWord(this.word))
        } else {
            this.store.dispatch(new CreateWord(this.word))
        }
    }

    ngOnDestroy() {
        // TODO Find better way to unsub from subs
        this.wordSub$.unsubscribe()
        this.langSub$.unsubscribe()
    }
}
