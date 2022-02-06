import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivateChild } from '@angular/router';
import { AuthService } from './auth.service';
import { NavigationService } from '../services/navigation-service.service';

@Injectable()
export class AuthGuardService implements CanActivate, CanActivateChild {
  
  constructor(
    private authService: AuthService,
    private router: NavigationService,
  ) { }

  /**
   * Checking Activated route 
   * @param route Activate Route snapshot
   * @param state  Define state of route
   */
  canActivate(route: ActivatedRouteSnapshot,state: RouterStateSnapshot): boolean 
  {
    let url: string = state.url;
    console.log("can activated url =", JSON.stringify(url))
    return this.checkLogin(url);
  }

  /**
   * Checking Activated child route
   * @param route Activate Route snapshot
   * @param state  Define state of route
   */
  canActivateChild(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    return this.canActivate(route, state);
  }

  /**
   * Checking When user is logged in or not
   * @param url Send url when redirect
   */
  checkLogin(url: string): boolean {


    if (this.authService.isLoggedIn) {
       return true;
       }

    // Store the attempted URL for redirecting
    this.authService.redirectUrl = url;

    // Navigate to the login page with extras
    // this.router.navigate('/', '');
    this.router.navigation('/', '');
    return false;
  }

}