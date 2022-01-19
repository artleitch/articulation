import {HttpErrorResponse, HttpResponseBase} from '@angular/common/http'
import {Injectable} from '@angular/core'
import {Actions, createEffect, ofType} from '@ngrx/effects'
import {of, timer} from 'rxjs'
import {catchError, concatMap, map, mergeMap, switchMap, tap} from 'rxjs/operators'
import * as NotificationActions from './authentication.actions'
import * as LanguageActions from '../../language/store/language.actions'
import {INotificationOptions, User} from '../authentication.model'
import {Router} from '@angular/router'
import {AuthenticationService, Tokens} from '../authentication.service'
import * as moment from 'moment'

@Injectable()
export class AuthenticationEffects {
    Login = createEffect(() => {
        return this.actions$.pipe(
            ofType(NotificationActions.LOGIN),
            map((action: NotificationActions.Login) => action.payload),
            switchMap((payload: any) => {
                return this.authService.logIn(payload.username, payload.password).pipe(
                    map((response: any) => {
                        return new NotificationActions.LoginSuccess({
                            username: response?.data?.user?.username,
                            id: response?.data?.user?.id,
                            accessToken: response?.data?.payload?.accessToken,
                            refreshToken: response.data.payload.refreshToken,
                            accessTokenExpiry: response.data.payload.accessTokenExpiry,
                            refreshTokenExpiry: response.data.payload.refreshTokenExpiry,
                        })
                    })
                )
            }),
            catchError(() => {
                return of(new NotificationActions.LoginFailure({}))
            })
        )
    })

    LoginSuccess = createEffect(
        () => {
            return this.actions$.pipe(
                ofType(NotificationActions.LOGIN_SUCCESS),
                map((action: NotificationActions.LoginSuccess) => action.payload),
                map((user) => {
                    const tokens: Tokens = {
                        accessToken: user.accessToken || '',
                        refreshToken: user.refreshToken || '',
                        accessTokenExpiry: moment(user.accessTokenExpiry).toDate(),
                        refreshTokenExpiry: moment(user.refreshTokenExpiry).toDate(),
                    }
                    this.authService.storeTokens(tokens)
                    this.authService.setBackgroundLoginTimer()
                    return user
                }),
                switchMap(() => {
                    return [new LanguageActions.GetPracticeLanguages()]
                })
            )
        },
        {dispatch: true}
    )

    Logout = createEffect(
        () => {
            return this.actions$.pipe(
                ofType(NotificationActions.LOGOUT),
                map(() => {
                    this.authService.clearTokens()
                    this.authService.clearBackgroundLoginTimer()
                    return this.router.navigate(['/'])
                })
            )
        },
        {dispatch: false}
    )

    RefreshToken = createEffect(() => {
        return this.actions$.pipe(
            ofType(NotificationActions.REFRESH_TOKEN),
            map((action: NotificationActions.RefreshToken) => action.payload),
            switchMap((payload: any) => {
                return this.authService.refresh(payload.refreshToken).pipe(
                    map((response: any) => {
                        const tokens: Tokens = {
                            accessToken: response?.data?.payload?.accessToken || '',
                            accessTokenExpiry: moment(response?.data?.payload?.accessTokenExpiry).toDate(),
                        }
                        this.authService.storeTokens(tokens)
                        this.authService.setBackgroundLoginTimer()
                        return new NotificationActions.RefreshTokenSuccess({
                            username: response?.data?.user?.username,
                            id: response?.data?.user?.id,
                            accessToken: response?.data?.payload?.accessToken,
                            refreshToken: response.data.payload.refreshToken,
                        })
                    })
                )
            }),
            catchError(() => {
                return of(new NotificationActions.LoginFailure({}))
            })
        )
    })

    RefreshSuccess = createEffect(() => {
        return this.actions$.pipe(
            ofType(NotificationActions.REFRESH_TOKEN_SUCCESS),
            map((action: NotificationActions.RefreshTokenSuccess) => action.payload),
            switchMap(() => {
                return [new LanguageActions.GetPracticeLanguages()]
            })
        )
    })

    constructor(private actions$: Actions, private authService: AuthenticationService, private router: Router) {}
}
