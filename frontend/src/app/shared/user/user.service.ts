import {HttpClient} from '@angular/common/http'
import {Injectable} from '@angular/core'
import * as iso639 from 'iso-639-1'
import {Observable} from 'rxjs'
import {map} from 'rxjs/operators'
import {User} from './user.model'

@Injectable({
    providedIn: 'root',
})
export class UserService {
    private baseDomain = 'user'

    constructor(private http: HttpClient) {}

    getUserById = (userId: string): Observable<User> => {
        const url = `${this.baseDomain}/${userId}`
        return this.http.get<User>(url)
    }

    getCurrentUser = (): Observable<User> => {
        const url = `${this.baseDomain}`
        return this.http.get<User>(url)
    }

    // TODO Move conversion to IDs here maybe?
    updateUser = (user: User): Observable<User> => {
        const url = `${this.baseDomain}/${user.id}`
        return this.http.post<User>(url, user)
    }
}
