import { LocalStorageService } from './local-storage.service';
import { Router } from '@angular/router';
import { environment } from '../environments/environment.prod';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Token } from '../types/auth.type';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root',
})
export class authService {
  constructor(
    private http: HttpClient,
    private router: Router,
    private tokenSvc: TokenService,
    private localStorageService: LocalStorageService
  ) {}

  login(username: string, password: string): Observable<any> {
    let body = {
      username: username,
      password,
      grant_type: 'password',
      scope: 'admin',    
    };
    return this.http.post(environment.apiUrl + '/spree_oauth/token', body, {
      headers: new HttpHeaders({
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }),
    });
  }

  verifyAdmin(token: Token): Observable<any> {
    this.tokenSvc.saveToken(token);
    return this.http.get(environment.apiUrl + '/api/v2/storefront/account', {
      headers: new HttpHeaders({
        Accept: 'application/vnd.api+json',
        Authorization: `Bearer ${token}`,
      }),
    });
  }

  logOut() {
    this.localStorageService.removeItem('token');
    this.router.navigateByUrl('/login');
  }
}
