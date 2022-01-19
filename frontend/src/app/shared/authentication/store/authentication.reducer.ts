import {User} from '../authentication.model'
import * as NotificationsActions from './authentication.actions'

export interface AuthenticationState {
    authenticated: boolean
    user: User | null
}

const initialState: AuthenticationState = {
    authenticated: false,
    user: null,
}

export const authenticationReducer: (
    state: AuthenticationState,
    action: NotificationsActions.NotificationsActions
) => void = (state = initialState, action: NotificationsActions.NotificationsActions) => {
    switch (action.type) {
        case NotificationsActions.LOGIN: {
            return {...state}
        }
        case NotificationsActions.LOGIN_SUCCESS: {
            return {
                ...state,
                authenticated: true,
                user: {
                    accessToken: action.payload.accessToken,
                    refreshToken: action.payload.refreshToken,
                    username: action.payload.username,
                    id: action.payload.id,
                },
            }
        }
        case NotificationsActions.LOGIN_FAILURE: {
            return {
                ...state,
                authenticated: false,
                user: null,
            }
        }
        case NotificationsActions.LOGOUT: {
            return {
                ...state,
                authenticated: false,
                user: null,
            }
        }
        case NotificationsActions.REFRESH_TOKEN: {
            return {
                ...state,
            }
        }
        case NotificationsActions.REFRESH_TOKEN_SUCCESS: {
            return {
                ...state,
                authenticated: true,
                user: {
                    accessToken: action.payload.accessToken,
                    refreshToken: action.payload.refreshToken,
                    username: action.payload.username,
                    id: action.payload.id,
                },
            }
        }

        default:
            return {...state}
    }
}
