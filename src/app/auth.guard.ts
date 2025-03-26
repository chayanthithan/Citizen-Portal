import { Injectable } from '@angular/core';
import {
  CanActivate,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { MainService } from './service/main.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private mainService: MainService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    // Check if the user is authenticated
    const isAuthenticated =
      this.mainService.loginDto &&
      (this.mainService.loginDto.lastName ||
        this.mainService.loginDto.email ||
        (this.mainService.loginDto.roles &&
          this.mainService.loginDto.roles.length > 0));

    if (isAuthenticated) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
