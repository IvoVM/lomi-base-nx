import { catchError } from 'rxjs/operators';
import { LocalStorageService } from './local-storage.service';
import { TokenService } from './token.service';
import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpContextToken,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Token } from '../types/auth.type';

const TOKEN_KEY = 'token';
export const BYPASS_JW_TOKEN = new HttpContextToken(() => false);

@Injectable({
  providedIn: 'root',
})
export class InterceptorService implements HttpInterceptor {
  constructor(
    private tokenService: TokenService,
    private localStorageService: LocalStorageService
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token: Token = this.localStorageService.getItem(TOKEN_KEY);
    let request = req;

    if (req.context.get(BYPASS_JW_TOKEN) === true) {
      if (token) {
        this.tokenService.checkTokenExpirationAndRefresh(token);

        request = req.clone({
          setHeaders: {
            Authorization: `Bearer ${token.access_token}`,
          },
        });
      }
    }

    return next.handle(request).pipe(
      catchError((error) => {
        return throwError(error);
      })
    );
  }
}
