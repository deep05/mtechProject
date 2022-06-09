import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { catchError, retry, map } from 'rxjs/operators';
import { credentials } from '../constant/credentials';
import { NavigationService } from './navigation-service.service';
import { Router } from '@angular/router';
import { GetLocalStorageService } from '../services/get-local-storage.service';

// const httpOptions = {
//   headers: new HttpHeaders({ 'Content-Type': 'application/json' })
// };

@Injectable()
export class HttpServices {
  constructor(private httpClient: HttpClient,
    private navigation: NavigationService,
    private router : Router,
    private getLocalStorageService: GetLocalStorageService) { }


  /**
     * Handeling errors
     * @param error 
     */
  private handleError(error: HttpErrorResponse) {
    console.log("handleError =",JSON.stringify(error))
    var checkError :any=error;
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
     // if (error.status == 0) {
     //   this.navigation.navigation('/', '');
    //}
      if (checkError ===  'Access Denied') {   
       // this.router.navigate(['/',''])
       //  this.navigation.navigation('/', '');
           sessionStorage.removeItem('session');
        }
      console.error(  `Backend returned code ${error.status}, ` +  `body was: ${error.error}`);
    }
    return throwError( 'Something bad happened; please try again later.');
  };


  /**
  * @param _url
  * @returns {{URL: string}}
  */
  private prepareHTTPConfig(_url: string, isNotAddContext?: boolean): any {
    let _endPointURL;
    _endPointURL = credentials.HOST + _url;
    // if (credentials.HOST == "api/" || credentials.HOST == "liveApi/") {
    //   _endPointURL = credentials.HOST + _url;
    // } else {
    //   _endPointURL = this.getHostName() + credentials.HOST + _url;
    // }
    // if (isNotAddContext) {
    //   _endPointURL = _url;
    // } else {
    // }
    return { URL: _endPointURL };
  }

  private getHostName() {
    return window.location.origin;
  }
  /**
   *    Post Request   
   */

  // public save(SUB_URL, params, headers?: any): Observable<any> {
  //   var url = this.prepareHTTPConfig(SUB_URL);
  //   return this.httpClient.post<any>(url.URL, params)
  //     .pipe(
  //       map((response: Response) => { return response }),
  //       catchError(this.handleError)
  //     )

  // }


  //   post with master url
  public post(SUB_URL: string, params: string, headers?: any): Observable<any> {
    var url = this.prepareHTTPConfig(SUB_URL);
    const httpOptions = {
      headers: new HttpHeaders(headers)
    };
    return this.httpClient.post<any>(url.URL, params, httpOptions)
      .pipe(
        map((response: Response) => { return response }),
        catchError(this.handleError)
      )
  }


  //  put with master url
  public put(SUB_URL: string, params: string, headers?: any): Observable<any> {
    var url = this.prepareHTTPConfig(SUB_URL);
    const httpOptions = {
      headers: new HttpHeaders(headers)
    };
    return this.httpClient.put<any>(url.URL, params, httpOptions)
      .pipe(
        map((response: Response) => { return response }),
        catchError(this.handleError)
      )
  }

  // patch with master url
  public patch(SUB_URL: string, params: string, headers?: any): Observable<any> {
    var url = this.prepareHTTPConfig(SUB_URL);
    const httpOptions = {
      headers: new HttpHeaders(headers)
    };
    return this.httpClient.patch<any>(url.URL, params, httpOptions)
      .pipe(
        map((response: Response) => { return response }),
        catchError(this.handleError)
      )
  }


  //   get with mster url
  public get(SUB_URL: string, headers?: any): Observable<any> {
    var url = this.prepareHTTPConfig(SUB_URL);
    const httpOptions = {
      headers: new HttpHeaders(headers)
    };
    return this.httpClient.get<any>(url.URL, httpOptions)
      .pipe(
        map((response: Response) => { return response }),
        catchError(this.handleError)
      )
  }


  //   delete with master url
  public delete(SUB_URL: string, headers?: any): Observable<any> {
    var url = this.prepareHTTPConfig(SUB_URL);
    const httpOptions = {
      headers: new HttpHeaders(headers)
    };
    return this.httpClient.delete<any>(url.URL, httpOptions)
      .pipe(
        map((response: Response) => { return response }),
        catchError(this.handleError)
      )
  }





  //   get with admin url
  public getAdmin(_url: string, headers?: any): Observable<any> {
    // var url = this.prepareHTTPConfig(SUB_URL);
    const httpOptions = {
      headers: new HttpHeaders(headers)
    };
    return this.httpClient.get<any>(credentials.ADMIN_HOST + _url, httpOptions)
      .pipe(
        map((response: Response) => { return response }),
        catchError(this.handleError)
      )
  }

  //   post with admin url
  public postAdmin(_url: string, params: string, headers?: any): Observable<any> {
    // var url = this.prepareHTTPConfig(SUB_URL);
    const httpOptions = {
      headers: new HttpHeaders(headers)
    };
    return this.httpClient.post<any>(credentials.ADMIN_HOST + _url, params, httpOptions)
      .pipe(
        map((response: Response) => { return response }),
        catchError(this.handleError)
      )
  }

  // patch with master url
  public patchAdmin(_url: string, params: string, headers?: any): Observable<any> {
    // var url = this.prepareHTTPConfig(SUB_URL);
    const httpOptions = {
      headers: new HttpHeaders(headers)
    };
    return this.httpClient.patch<any>(credentials.ADMIN_HOST + _url, params, httpOptions)
      .pipe(
        map((response: Response) => { return response }),
        catchError(this.handleError)
      )
  }

  //   delete with master url
  public deleteAdmin(_url: string, headers?: any): Observable<any> {
    // var url = this.prepareHTTPConfig(SUB_URL);
    const httpOptions = {
      headers: new HttpHeaders(headers)
    };
    return this.httpClient.delete<any>(credentials.ADMIN_HOST + _url, httpOptions)
      .pipe(
        map((response: Response) => { return response }),
        catchError(this.handleError)
      )
  }

  // authenticatino with admin url
  public auth(_url: string, params: string, headers?: any): Observable<any> {
    // var url = this.prepareHTTPConfig(SUB_URL);
    const httpOptions = {
      headers: new HttpHeaders(headers)
    };
    return this.httpClient.post<any>(credentials.ADMIN_HOST + _url, params, httpOptions)
      .pipe(
        map((response: Response) => { return response }),
        catchError(this.handleError)
      )
  }

  //---------Common Call------------------------------//
   //   get with admin url
   public getCommon(_url: string, headers?: any): Observable<any> {
    // var url = this.prepareHTTPConfig(SUB_URL);
    const httpOptions = {
      headers: new HttpHeaders(headers)
    };
    console.log("credentials.COMMON_HOST =",credentials.COMMON_HOST + _url)
    return this.httpClient.get<any>(credentials.COMMON_HOST + _url, httpOptions)
      .pipe(
        map((response: Response) => { return response }),
        catchError(this.handleError)
      )
  }

  //   post with admin url
  public postCommon(_url: string, params: string, headers?: any): Observable<any> {
    // var url = this.prepareHTTPConfig(SUB_URL);
    const httpOptions = {
      headers: new HttpHeaders(headers)
    };
  
    return this.httpClient.post<any>(credentials.COMMON_HOST + _url, params, httpOptions)
      .pipe(
        map((response: Response) => { return response }),
        catchError(this.handleError)
      )
  }

  // patch with master url
  public patchCommon(_url: string, params: string, headers?: any): Observable<any> {
    // var url = this.prepareHTTPConfig(SUB_URL);
    const httpOptions = {
      headers: new HttpHeaders(headers)
    };
    return this.httpClient.patch<any>(credentials.COMMON_HOST + _url, params, httpOptions)
      .pipe(
        map((response: Response) => { return response }),
        catchError(this.handleError)
      )
  }

  //   delete with master url
  public deleteCommon(_url: string, headers?: any): Observable<any> {
    // var url = this.prepareHTTPConfig(SUB_URL);
    const httpOptions = {
      headers: new HttpHeaders(headers)
    };
    return this.httpClient.delete<any>(credentials.COMMON_HOST + _url, httpOptions)
      .pipe(
        map((response: Response) => { return response }),
        catchError(this.handleError)
      )
  }




}
