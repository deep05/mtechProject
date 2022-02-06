import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { NotificationServices } from './notification-service.service';


@Injectable()
export class ErrorInterceptorService implements HttpInterceptor {
  constructor(private notificationServices: NotificationServices) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(catchError(err => {
      if (err.status === 401) {
        this.notificationServices.showNotification('error', err.status + ' Internal Server Error');
      } else if (err.status === 404) {
        this.notificationServices.showNotification('error', err.status + ' Internal Server Error');
      } else if (err.status === 500) {
        this.notificationServices.showNotification('error', err.status + ' Internal Server Error');
      } else if (err.status === 502) {
        this.notificationServices.showNotification('error', err.status + ' Internal Server Error');
      }
      const error = err.error.message || err.statusText;
      return throwError(error);
    }))
  }
}