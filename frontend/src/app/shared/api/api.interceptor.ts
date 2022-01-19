import {Injectable, Injector} from '@angular/core'
import {HttpEvent, HttpInterceptor, HttpHandler, HttpRequest} from '@angular/common/http'
import {AuthenticationService} from 'src/app/shared/authentication/authentication.service'
import {Observable} from 'rxjs'

const BASE_URL = 'http://localhost:3000'

@Injectable()
export class ApiInterceptor implements HttpInterceptor {
    constructor(private injector: Injector, private authService: AuthenticationService) {}
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        request = request.clone({
            url: `${BASE_URL}/${request.url}`,
        })

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
