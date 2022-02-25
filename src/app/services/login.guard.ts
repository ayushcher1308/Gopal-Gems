import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { map, Observable } from 'rxjs';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root',
})
export class LoginGuard implements CanActivate {
  constructor(private router: Router, private dataService: DataService) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {

    var token = localStorage.getItem('token');
    if (token == null) {
      return true;
    }

    const tokenObj = {
      token: token,
    };

    return new Promise((res) => {
      this.dataService.authenticate(tokenObj).subscribe(
        (data) => {
          if (!data.auth) {
            res(true);
          } else {
            this.router.navigate(['/dashboard']);
            res(false);
          }
        },
        (error) => {
          this.router.navigate(['/dashboard']);
          res(false);
        }
      );
    });
  }

  isAuthenticated(data: any) {
    return this.dataService.authenticate(data).subscribe(
      (res) => {
        return res.auth;
      },
      (err) => {
        return false;
      }
    );
  }
}
