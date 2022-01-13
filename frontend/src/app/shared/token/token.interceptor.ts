import {Injectable, Injector} from '@angular/core'
import {HttpEvent, HttpInterceptor, HttpHandler, HttpRequest} from '@angular/common/http'
import {AuthenticationService} from 'src/app/authentication/authentication.service'
import {Observable} from 'rxjs'

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
    constructor(private injector: Injector, private authService: AuthenticationService) {}
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        this.authService = this.injector.get(AuthenticationService)
        const token: string = this.authService.getAccessToken() || ''
        request = request.clone({
            setHeaders: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        })
        return next.handle(request)
    }
}
