import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { UserDataService } from '../user-data.service';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private dataService: DataService,private userData:UserDataService) {}
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
      this.router.navigate(['/login']);
      return false;
    }

    const tokenObj = {
      token: token,
    };
    return new Promise((res) => {
      this.dataService.authenticate(tokenObj).subscribe(
        (data) => {
          if (data.auth) {
            this.userData.setUserInfo(data.user);
            res(true);
          } else {
            this.router.navigate(['/login']);
            res(false);
          }
        },
        (error) => {
          this.router.navigate(['/login']);
          res(false);
        }
      );
    });
  }
}
