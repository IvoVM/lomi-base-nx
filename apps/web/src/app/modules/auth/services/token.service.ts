import { catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { environment } from '../environments/environment.prod';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Token } from '../types/auth.type';
import { LocalStorageService } from './local-storage.service';

const TOKEN_KEY = 'token';
const EXPIRATION_DATE_KEY = 'expirationDate';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  constructor(
    private http: HttpClient,
    private localStorageService: LocalStorageService
  ) {}

  saveToken(token: Token) {
    let localToken = JSON.stringify(token);
    this.localStorageService.setItem(TOKEN_KEY, localToken);
    this.saveTokenExpirationDate(token.expires_in);
  }

  saveTokenExpirationDate(seconds: number) {
    let expireDate = new Date(new Date().getTime() + seconds * 1000);
    let saveExpireDate = JSON.stringify(expireDate);
    this.localStorageService.setItem(EXPIRATION_DATE_KEY, saveExpireDate);
  }

  tokenIsExpired() {
    let expireDateSaved = this.localStorageService.getItem(EXPIRATION_DATE_KEY);
    if (expireDateSaved) {
      let expireDate = JSON.parse(expireDateSaved);
      let dateNow = new Date(new Date().getTime()).toJSON();

      return dateNow >= expireDate ? true : false;
    }
    return console.log('there is no expire Date available');
  }

  refreshToken(refresh_token: string): Observable<any> {
    return this.http
      .post(
        environment.apiUrl + '/spree_oauth/token',
        {
          grant_type: 'refresh_token',
          refresh_token,
        },
        {
          headers: new HttpHeaders({
            Accept: 'application/json',
            'Content-Type': 'application/json',
          }),
        }
      )
      .pipe(
        catchError((error) => {
          return throwError(error);
        })
      );
  }

  saveNewToken(myToken: Token) {
    this.refreshToken(myToken.refresh_token).subscribe({
      next: (res) => {
        console.log('savedTokenAfterRefreshed - next :' + res);
        this.saveToken(res);
      },
      error: (error) => {
        console.log('savedTokenAfterRefreshed - error :' + error);
      },
    });
  }

  checkTokenExpirationAndRefresh(token: Token): void {
    if (this.tokenIsExpired()) {
      console.log('Token is expired');
      this.saveNewToken(token);
    }
  }
}
