import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthenticationService } from '../services/authentication.service';
import { NotificationService } from '../services/notification.service';


@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private authenticationService: AuthenticationService, private notificationService: NotificationService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError(err => {
            if (err.status === 401) {
                this.authenticationService.logout();
                location.reload(true);
            } else if (err.status === 409) {
                let message;
                if (err.error.error.username) {
                    message = err.error.error.username;
                    this.notificationService.showErrorNotification('Pogreška', 'Već postoji korisnik s ovim korisničkim imenom!');
                } else if (err.error.error.email) {
                    message = err.error.error.email;
                    this.notificationService.showErrorNotification('Pogreška', 'Već postoji korisnik s ovom email adresom!');
                }
                return throwError(message);
            }

            const error = err.error.message || err.statusText;
            return throwError(error);
        }));
    }
}