import {HttpClient} from '@angular/common/http'
import {Injectable} from '@angular/core'
import * as iso639 from 'iso-639-1'
import {Observable} from 'rxjs'
import {Language} from './language.model'

@Injectable({
    providedIn: 'root',
})
export class LanguageService {
    private baseDomain = 'language'
    constructor(private http: HttpClient) {}

    createLanguage = (language: Language): Observable<Language> => {
        const url = `${this.baseDomain}`
        return this.http.post<Language>(url, language)
    }

    getAllLanguages = (): Observable<Language[]> => {
        const url = `${this.baseDomain}`
        return this.http.get<Language[]>(url)
    }

    getLanguageById = (languageId: string): Observable<Language> => {
        const url = `${this.baseDomain}/${languageId}`
        return this.http.get<Language>(url)
    }

    updateLanguage = (language: Language): Observable<Language> => {
        const url = `${this.baseDomain}/${language.id}`
        return this.http.post<Language>(url, language)
    }

    deleteLanguage = (languageId: string): Observable<any> => {
        const url = `${this.baseDomain}/${languageId}`
        return this.http.delete<any>(url)
    }
}
