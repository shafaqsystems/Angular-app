import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment } from '@angular/router';
import { Observable } from 'rxjs';

import { take, tap } from 'rxjs/operators';
import { UserService } from './user-service.service';

@Injectable()
export class AuthGuard implements CanLoad {
  constructor(
    private router: Router,
    private userService: UserService
  ) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ) {
    let token = localStorage.getItem('jwtToken') ;
    if (token) {
      return true;
    }if (!token) {
      this.router.navigate(['login']);
      return false;
    }
    else{
      return this.userService.isAuthenticated.pipe(take(1), tap(allowed => {

        if (!allowed) {
          let returnUrl = state.url;
          this.router.navigate(['/login']);
          return;
        } else {
          const currentUser = this.userService.getCurrentUser();
          if (currentUser) {
            if (currentUser.access_token) {
              // role not authorized so redirect to home page
              return true;
            }
            // authorized so return true
            return true;
          } else {
            this.router.navigate(['login']);
            return false;
          }
        }
      }
      ));
    }

  }

  canLoad(route: any, segemets: UrlSegment[]): Observable<boolean> {
    return this.userService.isAuthenticated.pipe(take(1), tap(allowed => {

      if (!allowed) {
        this.router.navigate(['login']);
        return;
      } else {
        const currentUser = this.userService.getCurrentUser();
        if (currentUser) {
             this.router.navigate(['/']);
             return true;
        } else {
          this.router.navigate(['/']);
          return false;
        }
      }
    }
    ));
  }
}
