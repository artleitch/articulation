import {HttpClient} from '@angular/common/http'
import {Injectable} from '@angular/core'
import * as iso639 from 'iso-639-1'
import {Observable} from 'rxjs'
import {GetWordsPayload} from './store/word.actions'
import {Word} from './word.model'

@Injectable({
    providedIn: 'root',
})
export class WordService {
    private baseDomain = 'word'
    constructor(private http: HttpClient) {}

    createWord = (word: Word): Observable<Word> => {
        const url = `${this.baseDomain}`
        return this.http.post<Word>(url, word)
    }

    getWords = (getWordsOptions: GetWordsPayload): Observable<Word[]> => {
        const url = `${this.baseDomain}`
        let queryString = '?'
        Object.keys(getWordsOptions).forEach((key) => {
            if (getWordsOptions[key as keyof GetWordsPayload]) {
                const arr = getWordsOptions[key as keyof GetWordsPayload]
                if (arr) {
                    arr.forEach((el) => {
                        queryString += `${key}=${el}&`
                    })
                }
            }
            // const value = getWordsOptions[key] as unknown
        })
        return this.http.get<Word[]>(`${url}${queryString}`)
    }

    /*
        createWord
        createNoun
        createVerb
        createPronoun
        createAdjective

        getWord
        getWords

        updateWord
        updateNoun
        updateVerb
        updatePronoun
        updateAdjective

        deleteWord

    */
}
