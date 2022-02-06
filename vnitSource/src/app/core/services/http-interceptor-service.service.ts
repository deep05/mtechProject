import { Injectable } from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpHeaders
} from '@angular/common/http';

import { Observable } from 'rxjs';
import { HttpServices } from './http-service.service';
import { GetLocalStorageService } from './get-local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorService implements HttpInterceptor {

  constructor(private httpService: HttpServices, private getLocalStorageService: GetLocalStorageService) { }

  intercept(req: HttpRequest<any>, next: any):
    Observable<HttpEvent<any>> {


    if (!req.headers.has('Content-Type')) {
      req = req.clone({ headers: req.headers.set('Content-Type', 'application/json') });
    }

    if (!req.headers.has('Access-Control-Allow-Headers')) {
      req = req.clone({ headers: req.headers.set('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept') });
    }

    if (!req.headers.has('Access-Control-Allow-Methods')) {
      req = req.clone({ headers: req.headers.set('Access-Control-Allow-Methods', 'GET, PUT, PATCH, POST, DELETE, OPTIONS') });
    }

    if (!req.headers.has('Access-Control-Allow-Credentials')) {
      req = req.clone({ headers: req.headers.set('Access-Control-Allow-Credentials', '*') });
    }

    if (!req.headers.has('Access-Control-Allow-Origin')) {
      req = req.clone({ headers: req.headers.set('Access-Control-Allow-Origin', '*') });
    }
    return next.handle(req);
  }
}