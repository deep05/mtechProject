import { Injectable } from '@angular/core';
import { HttpServices } from 'src/app/core/services/http-service.service';
import { Header } from 'primeng/api/shared';
import { GetLocalStorageService } from 'src/app/core/services/get-local-storage.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable()
export class CrudService {

  private baseUrl:string="http://localhost:8081";

  constructor(private httpServices: HttpServices,
    private getLocalStorageService: GetLocalStorageService, private http: HttpClient) { }

  // public actionPerform(URL, params) {
  //   return this.httpServices.save(URL, JSON.stringify(params));
  // }


  // NOTE :Headers?any in parameter eg. {"key":"value"} OR {"key":"value"},{"key":"value"},{"key":"value"}.....

  // FOR MASTER API
  public actionPerformPost(URL, params, headers?: any) {
    return this.httpServices.post(URL, JSON.stringify(params), headers);
  }

  //add data to the db
  public add(data:any, headers?:any){
   console.log('checked');
   console.log(data)
   const body=JSON.stringify(data);
   console.log(body)
    return this.http.post(`${this.baseUrl}/post_item`,body,headers)
  }

  //downloading screens
  public download(){
    return this.http.get(`${this.baseUrl}/get`)
  }

  // FOR MASTER API
  public actionPerformPut(URL, params, headers?: any) {
    return this.httpServices.put(URL, JSON.stringify(params), headers);
  }

  // FOR MASTER API
  public actionPerformPatch(URL, params, headers?: any) {
    return this.httpServices.patch(URL, JSON.stringify(params), headers);
  }

  // FOR MASTER API
  public actionPerformGet(URL, headers?: any) {
    return this.httpServices.get(URL, headers);
  }

  // FOR MASTER API
  public actionPerformDelete(URL, headers?: any) {
    return this.httpServices.delete(URL, headers);
  }


  // FOR ADMIN API
  public adminActionPerformGet(URL, headers?: any) {
    return this.httpServices.getAdmin(URL, headers);
  }

  // FOR ADMIN API
  public adminActionPerformPost(URL, params, headers?: any) {
    return this.httpServices.postAdmin(URL, JSON.stringify(params), headers);
  }

  // FOR ADMIN API
  public adminActionPerformPatch(URL, params, headers?: any) {
    return this.httpServices.patchAdmin(URL, JSON.stringify(params), headers);
  }

    // FOR ADMIN API
    public adminActionPerformDelete(URL, headers?: any) {
      return this.httpServices.deleteAdmin(URL, headers);
    }



  public actionPerformAuthentication(URL, params, headers?: any) {
    return this.httpServices.auth(URL, JSON.stringify(params), headers);
  }

  //--------Coomon Call --------------------------//
   // FOR Common API
   public commonActionPerformGet(URL, headers?: any) {
    return this.httpServices.getCommon(URL, headers);
  }

  // FOR Common API
  public commonActionPerformPost(URL, params, headers?: any) {
    return this.httpServices.postCommon(URL, JSON.stringify(params), headers);
  }

  // FOR Common API
  public commonActionPerformPatch(URL, params, headers?: any) {
    return this.httpServices.patchCommon(URL, JSON.stringify(params), headers);
  }

    // FOR Common API
    public commonActionPerformDelete(URL, headers?: any) {
      return this.httpServices.deleteCommon(URL, headers);
    }


}
