import {NgModule} from '@angular/core'
import {BrowserModule} from '@angular/platform-browser'

import {AppRoutingModule} from './app-routing.module'
import {AppComponent} from './app.component'

import {StoreModule} from '@ngrx/store'
import {FormsModule} from '@angular/forms'
import {MatSelectModule} from '@angular/material/select'

import * as fromApp from './shared/store/app.reducer'
import {EffectsModule} from '@ngrx/effects'
import {AuthenticationEffects} from './shared/authentication/store/authentication.effects'
import {AuthenticationModule} from './shared/authentication/authentication.module'
import {AuthenticationService} from './shared/authentication/authentication.service'
import {HTTP_INTERCEPTORS} from '@angular/common/http'
import {ApiInterceptor} from './shared/api/api.interceptor'
import {BrowserAnimationsModule} from '@angular/platform-browser/animations'
import {HeaderModule} from './shared/header/header.module'
import {LoginModule} from './shared/login/login.module'
import {LanguageEffects} from './shared/language/store/language.effects'
import {AdminModule} from './admin/admin.module'
import {WordModule} from './word/word.module'
import {WordEffects} from './shared/word/store/word.effects'
import {DashboardModule} from './dashboard/dashboard.module'

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        AuthenticationModule,
        WordModule,
        DashboardModule,
        StoreModule.forRoot(fromApp.appReducer),
        EffectsModule.forRoot([AuthenticationEffects, LanguageEffects, WordEffects]),
        FormsModule,
        BrowserAnimationsModule,
        HeaderModule,
        LoginModule,
        AdminModule,
    ],
    providers: [
        AuthenticationService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: ApiInterceptor,
            multi: true,
        },
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
