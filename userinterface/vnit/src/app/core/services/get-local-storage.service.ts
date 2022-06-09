import { Injectable } from '@angular/core';

@Injectable()
export class GetLocalStorageService {

  constructor() { }

  /**
   * Return localstorage data
   */
  public get getSession(): boolean {
    return JSON.parse(sessionStorage.getItem('session'));
  }

  /**
   * Set local storage data
   */
  public setSession(value: any) {
    sessionStorage.setItem('session', JSON.stringify(value));
  }

  public removeSession() {
    sessionStorage.clear();
  }
}
