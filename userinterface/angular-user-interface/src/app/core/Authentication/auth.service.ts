import { Injectable, OnDestroy } from '@angular/core';
import { GetLocalStorageService } from '../services/get-local-storage.service';
import { CrudService } from 'src/app/common/services/crud.service';
import { NavigationService } from '../services/navigation-service.service';
import { GLOBAL_CONSTANTS } from '../services/global.constants';
import { Observable, of } from 'rxjs';
import { delay, tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class AuthService {

  constructor(
    private getLocalStorageService: GetLocalStorageService,
    private crudService: CrudService,
    private navigationService: NavigationService,
    private GLOBAL_CONSTANTS: GLOBAL_CONSTANTS,
    private router: Router
  ) { }

  isLoggedIn = false;

  // store the URL so we can redirect after logging in
  redirectUrl: string;

  login(): Observable<boolean> {
    return of(true).pipe(
      delay(1000),
      tap(val => this.isLoggedIn = true)
    );
  }

  logout(): void {
    this.isLoggedIn = false;
  }
  /**
   * Removing current session
   */

  public removeSession() {
    if (this.getLocalStorageService.getSession) {
      let param = {
        "token": this.getLocalStorageService.getSession['token'],
        "username": this.getLocalStorageService.getSession['username']
      }

      this.crudService.actionPerformAuthentication('logout', param).subscribe(response => {
        if (response.code === 200) {
          this.isLoggedIn = false;
          this.getLocalStorageService.removeSession();
          // this.navigationService.navigate('/', '');
          this.router.navigate([''])
          return false;
        }
      });
    }
  }

  /**
   * Check Login If Token is generated or Not
   */
  checkLogin(URL?: any) {
    this.GLOBAL_CONSTANTS.LOADER_FLAG = true;
    if (this.getLocalStorageService.getSession) {
      this.login().subscribe(() => {
        if (this.isLoggedIn) {
          // Get the redirect URL from our auth service
          // If no redirect has been set, use the default
          let redirect = this.redirectUrl ? this.redirectUrl : URL;
          // Redirect the user
          this.navigationService.navigation(redirect, '', 'Login');
          this.GLOBAL_CONSTANTS.LOADER_FLAG = false;
        } else {
          this.GLOBAL_CONSTANTS.LOADER_FLAG = false;
        }
      });

    } else {
      this.getLocalStorageService.removeSession();
      this.navigationService.navigate(URL, '');
      return false;
    }
  }
}