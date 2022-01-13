import {NgModule} from '@angular/core'
import {BrowserModule} from '@angular/platform-browser'

import {AppRoutingModule} from './app-routing.module'
import {AppComponent} from './app.component'

import {StoreModule} from '@ngrx/store'
import {FormsModule} from '@angular/forms'

import * as fromApp from './shared/store/app.reducer'
import {EffectsModule} from '@ngrx/effects'
import {AuthenticationEffects} from './authentication/store/authentication.effects'
import {AuthenticationModule} from './authentication/authentication.module'
import {LoginModule} from './authentication/login/login.module'
import {AuthenticationService} from './authentication/authentication.service'
import {HTTP_INTERCEPTORS} from '@angular/common/http'
import {TokenInterceptor} from './shared/token/token.interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        AuthenticationModule,
        LoginModule,
        StoreModule.forRoot(fromApp.appReducer),
        EffectsModule.forRoot([AuthenticationEffects]),
        FormsModule,
        BrowserAnimationsModule,
    ],
    providers: [
        AuthenticationService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: TokenInterceptor,
            multi: true,
        },
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
