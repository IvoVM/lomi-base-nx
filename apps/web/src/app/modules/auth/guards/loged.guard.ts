import { LoginFormComponent } from '../components/loginForm/login-form.component';
import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { allowedUsersTypes } from './allowedUsersTypes';

@Injectable({
  providedIn: 'root',
})
export class LogedGuard implements CanActivate {
  userRoles!: string[];
  constructor(private router: Router) {}
  redirect(flag: boolean) {
    if (!flag) {
      this.router.navigateByUrl('/login');
    }
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (!(allowedUsersTypes.find((role) => role === 'admin'))) {
      this.redirect(false);
    } else {
      return true;
    }
    return false;
  }
}
