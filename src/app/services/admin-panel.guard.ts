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

@Injectable({
  providedIn: 'root',
})
export class AdminPanelGuard implements CanActivate {
  constructor(private userData: UserDataService, private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    var user = this.userData.getUserInfo();

    if (user == null || user.role != 'admin') {
      this.router.navigate(['/dashboard']);
      return false;
    }
    return true;
  }
}
