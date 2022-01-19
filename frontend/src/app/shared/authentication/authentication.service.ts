import {HttpClient} from '@angular/common/http'
import {Injectable} from '@angular/core'
import {Observable, Subscription, timer} from 'rxjs'
import {AppState} from '../store/app.reducer'
import {User} from './authentication.model'
import {Store} from '@ngrx/store'
import * as moment from 'moment'
import {RefreshToken, RefreshTokenSuccess} from './store/authentication.actions'

export interface Tokens {
    accessToken?: string
    refreshToken?: string
    accessTokenExpiry?: Date
    refreshTokenExpiry?: Date
}

export const ACCESS_TOKEN_KEY = 'accessToken'
export const ACCESS_TOKEN_EXPIRY_KEY = 'accessTokenExpiry'
export const REFRESH_TOKEN_KEY = 'refreshToken'
export const REFRESH_TOKEN_EXPIRY_KEY = 'refreshTokenExpiry'

@Injectable({
    providedIn: 'root',
})
export class AuthenticationService {
    private _backgroundLoginTimer$?: Subscription

    constructor(private http: HttpClient, private store: Store<AppState>) {}

    getAccessToken(): string | null {
        return localStorage.getItem(ACCESS_TOKEN_KEY)
    }

    getRefreshToken(): string | null {
        return localStorage.getItem(REFRESH_TOKEN_KEY)
    }

    logIn(username: string, password: string): Observable<any> {
        const url = `api/auth/login`
        return this.http.post<User>(url, {username, password})
    }

    refresh(refreshToken: string): Observable<any> {
        const url = `api/auth/refresh`
        return this.http.post<User>(url, {refreshToken: refreshToken})
    }

    getStatus(): Observable<any> {
        const url = `api/auth/me`
        return this.http.get<User>(url)
    }

    clearTokens = () => {
        const keys = [ACCESS_TOKEN_KEY, ACCESS_TOKEN_EXPIRY_KEY, REFRESH_TOKEN_KEY, REFRESH_TOKEN_EXPIRY_KEY]
        keys.forEach((key) => {
            localStorage.removeItem(key)
        })
    }

    storeTokens = (tokens: Tokens) => {
        if (tokens.accessToken) localStorage.setItem(ACCESS_TOKEN_KEY, tokens.accessToken)
        if (tokens.refreshToken) localStorage.setItem(REFRESH_TOKEN_KEY, tokens.refreshToken)
        if (tokens.accessTokenExpiry)
            localStorage.setItem(ACCESS_TOKEN_EXPIRY_KEY, moment(tokens.accessTokenExpiry).format())
        if (tokens.refreshTokenExpiry)
            localStorage.setItem(REFRESH_TOKEN_EXPIRY_KEY, tokens.refreshTokenExpiry.toISOString())
    }

    backgroundLogin = () => {
        // check if there is a refresh token
        const refreshToken = this.getRefreshToken()
        if (!refreshToken) return

        // check if valid refresh expiry
        const refreshTokenExpiry = localStorage.getItem(REFRESH_TOKEN_EXPIRY_KEY)
        if (moment().isAfter(moment(refreshTokenExpiry))) return

        // refresh tokens
        this.store.dispatch(new RefreshToken({refreshToken}))
    }

    setBackgroundLoginTimer = () => {
        // TODO check that expiry is after now
        const accessTokenExpiry = localStorage.getItem(ACCESS_TOKEN_EXPIRY_KEY)
        const refreshToken = this.getRefreshToken()
        if (accessTokenExpiry && refreshToken) {
            this._backgroundLoginTimer$ = timer(moment(accessTokenExpiry).toDate()).subscribe((val) => {
                this.store.dispatch(new RefreshToken({refreshToken}))
            })
        }
    }

    clearBackgroundLoginTimer = () => {
        this._backgroundLoginTimer$?.unsubscribe()
    }
}
