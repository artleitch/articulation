import {HttpResponseBase} from '@angular/common/http'
import {Action} from '@ngrx/store'
import {INotificationOptions, User} from '../authentication.model'
export const LOGIN = '[AUTH] LOGIN'
export const LOGOUT = '[AUTH] LOGOUT'
export const LOGIN_SUCCESS = '[AUTH] LOGIN_SUCCESS'
export const LOGIN_FAILURE = '[AUTH] LOGIN_FAILURE'
export const REFRESH_TOKEN = '[AUTH] REFRESH_TOKEN'
export const REFRESH_TOKEN_SUCCESS = '[AUTH] REFRESH_TOKEN_SUCCESS'

export class Login implements Action {
    readonly type = LOGIN

    constructor(public payload: User) {}
}

export class Logout implements Action {
    readonly type = LOGOUT

    constructor() {}
}

export class LoginSuccess implements Action {
    readonly type = LOGIN_SUCCESS

    constructor(public payload: User) {}
}

export class LoginFailure implements Action {
    readonly type = LOGIN_FAILURE

    constructor(public payload: User) {}
}

export class RefreshToken implements Action {
    readonly type = REFRESH_TOKEN

    constructor(public payload: User) {}
}

export class RefreshTokenSuccess implements Action {
    readonly type = REFRESH_TOKEN_SUCCESS

    constructor(public payload: User) {}
}

export type NotificationsActions = Login | LoginSuccess | LoginFailure | Logout | RefreshToken | RefreshTokenSuccess
