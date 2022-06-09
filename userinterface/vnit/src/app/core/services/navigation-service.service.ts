import { Injectable } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
// import { GLOBAL_CONSTANTS } from './global.constants';

@Injectable()
export class NavigationService {

  constructor(
    private router: Router,
    // private GLOBAL_CONSTANTS:GLOBAL_CONSTANTS
    ) { }

  /**
   * 
   * @param url URL to navigate page
   * @param bredcrum Title/Bredcrum to show over page
   * @param params Extra params if Required for navigation
   */

  public navigate(url, bredcrum, id?: any, params?: any, params3?: any, param1?: any, param2?: any) {
    // this.GLOBAL_CONSTANTS.BACK_BUTTON_FLAG = false;
    // this.GLOBAL_CONSTANTS.ENABLE_EXIT_BUTTON = true;
    // this.GLOBAL_CONSTANTS.ENABLE_CLEAR_BUTTON = true;
    let navigationExtras: NavigationExtras = {
      queryParams: {
        'bredcrum': bredcrum,
        'id': id,
        'param1': param1,
        'param2': param2,
        'params': params,
        'params3': params3,
      },
      skipLocationChange: true,
    }
    this.router.navigate([url], navigationExtras)
  }

  public navigation(url, bredcrum, id?: any, params?: any, param1?: any, param2?: any) {
    // console.log("navigation url =", JSON.stringify(url))
    // this.GLOBAL_CONSTANTS.BACK_BUTTON_FLAG = false;
    // this.GLOBAL_CONSTANTS.ENABLE_EXIT_BUTTON = true;
    // this.GLOBAL_CONSTANTS.ENABLE_CLEAR_BUTTON = true;
    let navigationExtras: NavigationExtras = {
      queryParams: {
        'bredcrum': bredcrum,
        'id': id,
        'param1': param1,
        'param2': param2,
        'params': params,
      },
      // skipLocationChange: true,
    }
    
    this.router.navigate([url])
  }
}
