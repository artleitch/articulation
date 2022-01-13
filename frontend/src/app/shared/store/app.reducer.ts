import {ActionReducerMap} from '@ngrx/store'

import * as fromAuthentication from '../../authentication/store/authentication.reducer'

export interface AppState {
    authentication: fromAuthentication.AuthenticationState
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const appReducer: ActionReducerMap<any, any> = {
    // This is where we would add more definitions of stores / reducers
    authentication: fromAuthentication.authenticationReducer,
}
