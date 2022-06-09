import { DatePipe } from '@angular/common';
import { Injectable, Input } from '@angular/core';
import { Subject } from 'rxjs';
import { CrudService } from 'src/app/common/services/crud.service';
import { GetLocalStorageService } from './get-local-storage.service';
import { GLOBAL_CONSTANTS } from './global.constants';
import { NotificationServices } from './notification-service.service';

import { credentials } from '../constant/credentials';
import { HttpClient } from '@angular/common/http';



declare var jQuery: any;
@Injectable()
export class ConfigService {

  private accessArrayAsObservable = new Subject<any>();
  subscribedAccessArray$ = this.accessArrayAsObservable.asObservable();

  private subscribeObjects = new Subject<any>();
  subscribedObjects$ = this.subscribeObjects.asObservable();
  backRoute: any;
  backObject: any;

  constructor(
    public GLOBAL_CONSTANTS: GLOBAL_CONSTANTS,
    // private printXlsxReportService: PrintXlsxReportService,
    private notificationServices: NotificationServices,
    private getLocalStorageService: GetLocalStorageService,
    // private crudService: CrudService,
    // private navigationService: NavigationService,
    private datepipe: DatePipe, 
    private crudService: CrudService,
    private http: HttpClient,
  ) { }

  /**
    * prepare for action buttons 
    * @param item action item
    * ********************/
 
  // FORMAT DATE
  multiFormatDate(dateData: any) {
    // var splitedDate1 = [];
    // splitedDate1 = date.split('-', 3)
    // return { date: { day: splitedDate1[2], month: splitedDate1[1], year: splitedDate1[0] } }
    let year = dateData.slice(0, 4)
    let month = dateData.slice(5, 7)
    let day = dateData.slice(8, 10)
    let times = dateData.slice(11, 20)
    let formatedDate = day + "-" + month + "-" + year
    let formatedDateTime

    if (times !== "") {
      formatedDateTime = day + "-" + month + "-" + year + " " + times;
    }
    else {
      formatedDateTime = ""
    }

    let temp = {
       "formatedDate": formatedDate, // Return format dd-mm-yyyy
       "formatedDateTime": formatedDateTime  // Return format dd-mm-yyyy hh:mm:ss.mili-second 
      }
    return temp
  }


// RETURN ENCODED FILTER PARAMETER
getEncodedFilter(object:any=[], limit?: any ){
  return object
}

//COMMON FUNCTION TO POST EVENT DATA ON EVERY EVENT
  asyncCurrentEvent(event: any, menuId?:any, objectCode?:any) {
    
  }
  //COMMON FUNCTION TO GET OBJECT LABEL,TOOLTIP, MAXLENGTH,TYPE,REQUIRED


  /**
  * Showing Model on click of actions
  * ********************/
  public showModel(modelId: any) {
    jQuery(modelId).modal("show");
  }

  /**
  * Hiding Model
  * @param modelId Model Id which is to be closed 
  * ********************/
  public dismissModel(modelId: any) {
    jQuery(modelId).modal("hide");
  }

  /**
  * Showing error while server will give any exeption
  * ********************/
  handleErrorExecptionMsg() {
    this.notificationServices.showNotification('error', 'Something went wrong, try again later')
  }

  /**
  * Enabling Loader
  * ********************/
  enabledLoader() {
    this.GLOBAL_CONSTANTS.LOADER_FLAG = true;
  }

  /**
  * Disabling Loader
  * ********************/
  disableLoader() {
    setTimeout(() => {
      this.GLOBAL_CONSTANTS.LOADER_FLAG = false;
    }, 200)
  }

  /**
  * Enabling action button footer
  * ********************/
  enabledFooterFlag() {
    this.GLOBAL_CONSTANTS.FOOTER_FLAG = true;
  }

  /**
  * Disabling action button footer
  * ********************/
  disableFooterFlag() {
    this.GLOBAL_CONSTANTS.FOOTER_FLAG = false;
  }

  /**
   * 
   * @param route Route for going back
   * @param flag Back Button Flag to update enable
  * ********************/
  enableBackButton(flag: boolean) {
    this.GLOBAL_CONSTANTS.BACK_BUTTON_FLAG = flag;
  }

  /**
   * 
   * @param route Route for going back
   * @param flag Back Button Flag to update disable
   * * ********************/
  disableBackButton(flag: boolean, route?: any) {
    this.GLOBAL_CONSTANTS.BACK_BUTTON_FLAG = flag;
  }

  /**
   * Scrolling up
   * ********************/
  scrollUp() {
    window.scrollTo(0, 0);
  }

  /**
   * 
   * @param id id to be disable model
   * ***********/
  disableModelClose(id: any) {
    jQuery(id).modal({
      backdrop: 'static',
      keyboard: false
    });
  }


  isNullUndefined(obj: string | any[] | null | undefined,msg?:any){
      if(obj === null || obj === undefined || obj === [] || obj ==='' || obj.length===0 || obj ===" " || obj ===""){
        return false;
      }else{ return true; }
  }

  isUndefinedOrNull(value: string | any[] | null | undefined) {
    return (value === undefined || value === null || value === "" || value.length === 0 || value === "null" || value === "undefined");
};

lengthLessThenThree(value: string | any[] | null | undefined) {
  return (value === undefined || value === null || value === "" || value.length <= 3)
   
};

  roundTo(n: number, digits: number | undefined) {
    if (digits === undefined) {
      digits = 0;
    }
    var multiplicator = Math.pow(10, digits);
    n = parseFloat((n * multiplicator).toFixed(11));
    return (Math.round(n) / multiplicator).toFixed(2);
  }

  addData(val1: number | number,val2: number){
    console.log(val1);
    console.log("val2" + val1);
    var total:any=0; 
    return total =  (Math.round(val1)  +  Math.round(val2) ).toFixed(2); 
}

}
/**
 * Service to be created for Applying the validations
 */
@Injectable()
export class RegExpressionService {
  STRNG_PATTERN_I = "^([A-Za-z]+)+[a-zA-Z- ]{0,2000}$";
  STRNG_PATTERN_II = "^[A-Za-z0-9]+[ A-Za-z0-9]+$|^[A-Za-z0-9]+$";
  STRNG_PATTERN_III = /^[A-Za-z0-9&()_\]\[\-]+[ A-Za-z0-9&()_\]\[\-]+$|^[A-Za-z0-9&()_\]\[\-]+$/;
  //STRNG_PATTERN_IIII = "^[a-zA-Z0-9 -]{0,2000}$";
  STRNG_PATTERN_IIII = "^[A-Za-z0-9&-]+[ A-Za-z0-9&-]+$|^[A-Za-z0-9&-]+$";
  //STRNG_PATTERN_IX = '^(?!\s*$)[-a-zA-Z0-9_ ]{1,9}$'; //
  STRNG_PATTERN_X = '^[A-Za-z0-9-&()".]+[ A-Za-z0-9-&()".]+$|^[A-Za-z0-9-&()".]+$';
  //STRNG_PATTERN_X = '^[A-Za-z0-9-&(),".]+[ A-Za-z0-9-&(),".]+$|^[A-Za-z0-9-&(),".]+$';
  STRNG_PATTERN_XI = '^[A-Za-z&_/-]+[ A-Za-z&_/-]+$|^[A-Za-z&_/-]+$';
  STRNG_ALPHASPL_PATTERN = /^[a-zA-Z_0-9@\#\$\^%&*()+=\-[\]\\\;,\.\/\{\}\|\":<>\? ]+$/;
  STRNG_ALPHASPL_CURRENCY_PATTERN = /^[₹$د.إ £¥a-zA-Z_0-9@\#\$\^%&*()+=\-[\]\\\'\`;,\.\/\{\}\|\":<>\? ]+$/;
  STRNG_PATTERN_FOR_CODE = "^([A-Za-z0-9-()_/]+)+[a-zA-Z0-9- ]{0,2000}$";
  ADDRESS_PATTERN = "^[A-Za-z0-9.]+[ A-Za-z0-9.]+$|^[A-Za-z0-9.]+$";
  STRNG_PATTERN_ADDRESS = /^([a-zA-Z0-9./()\- ]){0,100}$/;
  STRNG_PATTERN_WITH_DOT_PREFIX = "^([A-Za-z.]+)+[a-zA-Z- ]{0,2000}$";
  STRNG_PATTERN_GRADE_LATTER = "^([A-Za-z0-9-+]+)+[a-zA-Z0-9- ]{0,2000}$";
  STRNG_PATTERN_UNDERSCORE = "^([A-Za-z0-9]+)+[a-zA-Z0-9-_.@ ]{1,40}$";
  STRNG_PATTERN_FILTER_LIST = /^[A-Za-z0-9-&()".]+[ A-Za-z0-9-&()".]+$|^[A-Za-z0-9 -()_,'"]+$/;
  STRNG_PATTERN_LOV_HEADERS = /^[A-Za-z0-9-&()".]+[ A-Za-z0-9-&()".]+$|^[A-Za-z0-9- (,)]+$/;
  STRNG_PATTERN_LOV_SIZE = /^[0-9-&()".]+[ 0-9-&()".]+$|^[0-9 ,]+$/;

  STRNG_PATTERN_alphanum_space = "^[A-Za-z0-9 ]+[A-Za-z0-9 ]+$|^[A-Za-z0-9 ]+$";
  STRNG_PATTERN_PATH= "^[A-Za-z0-9/-]+[ A-Za-z0-9/-]+$|^[A-Za-z0-9/-]+$";
  STRNG_PATTERN_XII= "^[A-Za-z_-]+[ A-Za-z_-]+$|^[A-Za-z_-]+$";

  NO = "^[0-9]{0,2000}$";
  NO_DOT = "^[0-9.]{0,2000}$";
  NO_HIFEN = "^[0-9-]{0,2000}$";
  YEAR = "^[0-9-/]{0,2000}$";
  STRNG_PATTERN_IX = /^(?!\s*$)[-a-zA-Z0-9-_ ]{1,5}$/;
  PANNO = /^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}?$/;
  GSTINNO = /^([0-9]){2}([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}([0-9]){1}([a-zA-Z]){1}([a-zA-Z0-9]){1}?$/;
  IFSCNO = /^([a-zA-Z]){4}([0-9]){7}?$/;
  AADHARNO = /^\d{12}$/;
  FAXNO = /^[a-zA-Z_0-9\()+\-[\]\\\;,\.\/\{\}\|\"':<>\? ]+$/;
  MOBILENO = /^[a-zA-Z_0-9\()+\-[\]\\\;,\.\/\{\}\|\"':<>\? ]+$/;
  PHONENO = /^[a-zA-Z_0-9\()+\-[\]\\\;,\.\/\{\}\|\"':<>\? ]+$/;
  EMAIL = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/; // email
  DECIMAL_PATTERN_I = "^[.0-9_ -]{0,2000}$";
  // DECIMAL_PATTERN_I = "^[.0-9_ -]{3,{'" + this.lenght + "'} }$";
  DECIMAL_PATTERN_II = /^[.\d]+$/;
  DECIMAL_PATTERN_III = /^(?:[0-9]{0,2}(?:\.[0-9]{0,2})?)?$/; // 99.99
  DECIMAL_PATTERN_IIII = /^(?:[0-9]{0,15}(?:\.[0-9]{0,2})?)?$/; //10000000.22
  DECIMAL_PATTERN_IV = /^(([0-9]+\.)+[0-9]{2,2})$/;  //1234__8788.99
  DECIMAL_PATTERN_V = /^(?:[0-9]{0,4}(?:\.[0-9]{0,3})?)?$/; // 9999.999 to -9999.999 (7,3)
  DECIMAL_PATTERN_VI = /^(?:[0-9]{0,12}(?:\.[0-9]{0,2})?)?$/; // 999900000000.99 to -999900000000.99
  DECIMAL_PATTERN_VII = /^(?:[0-9]{0,9}(?:\.[0-9]{0,3})?)?$/; // 999999999.999 to -999999999.999 (12,3) maxlength =13
  DECIMAL_PATTERN_VIII = /^(?:[0-9]{0,8}(?:\.[0-9]{0,2})?)?$/; // 99999999.99 (10,2) maxlength =11
  DECIMAL_PATTERN_IX = /^(?:[0-9]{0,5}(?:\.[0-9]{0,2})?)?$/; // 49999.99 to -49999.99
  DECIMAL_PATTERN_X = /^(?:[0-9]{0,3}(?:\.[0-9]{0,2})?)?$/; // 499.99 to -499.99
  DECIMAL_PATTERN_XI = /^(?:[0-9]{0,10}(?:\.[0-9]{0,10})?)?$/; // 9999999999.9999999999 to -9999999999.9999999999 (20,10) maxlength =21
  DECIMAL_PATTERN_XII = /^(?:[0-9]{0,5}(?:\.[0-9]{0,5})?)?$/; // 99999.99999 (10,5) maxlength =11
  DECIMAL_PATTERN_XIII = /^(?:[0-9]{0,5}(?:\.[0-9]{0,2})?)?$/; // 9999.999 to -99999.99 (7,2)
  DECIMAL_PATTERN_XIIII = /^(?:[0-9]{0,11}(?:\.[0-9]{0,2})?)?$/; // 999999999999.99 (14,2)
  DECIMAL_PATTERN_XV = /^(?:-?[0-9]{0,4}(?:\.[0-9]{0,2})?)?$/; // 9999.99 to -9999.99 (6,2)
  DECIMAL_PATTERN_XVI = /^(?:[0-9]{0,8}(?:\.[0-9]{0,2})?)?$/; //10000000.22
  DECIMAL_PATTERN_XVII = /^(?:[0-9]{0,7}(?:\.[0-9]{0,3})?)?$/; // 9999999.999 (10,3) maxlength =11
  DECIMAL_PATTERN_XVIII = /^(?:[0-9]{0,2}(?:\.[0-9]{0,3})?)?$/; // 99.999 (5,3)
  DECIMAL_PATTERN_XVIIII = /^(?:[0-9]{0,12}(?:\.[0-9]{0,4})?)?$/; // 999999999999.9999 (12,4) maxlength =17

  PASSWORD_PATTERN = /^(?![0-9])(?=.*?[0-9])(?=.*?[a-zA-Z])(?=.*?[_.&-=?;!@#$%^&*])[a-zA-Z0-9_.&-=?;!@#$%^&*]{6,15}$/;
  USER_CODE_PATTERN = "^[0-9A-Za-z-_.@]{1,20}$";
  USER_NAME_PATTERN = "^([A-Za-z0-9]+)+[a-zA-Z0-9-_.@ ]{1,40}$";
  TDS_NAME_PATTERN = "^([A-Za-z]+)+[a-zA-Z() ]{1,40}$";
  PINCODE_PATTERN = "^[0-9]{6}$";
  TELEPHONE_NO_PATTERN = /^([0-9]){0,20}$/;
  MOBILE_NO_PATTERN = /^([0-9+]){1}([0-9,]){9,19}?$/;
  DATE_FORMAT_FOR_PATTERN = /^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/;
  CODE_PATTERN = /^[0-9A-Za-z-]+$/;
  NAME_PATTERN = /^[a-zA-Z_0-9@\#\$\^%&*()+=\-[\]\\\'\;,\.\/\{\}\|\":<>\? ]+$/;
  /**
   * Erro messages according to pattern 
   */
  ERROR_MSG_STRNG_PATTERN_UNDERSCORE = 'Invalid pattern.Only alpha special character allowed!';  /** Applied when Patern String is X */
  ERROR_MSG_STRNG_PATTERN_I = "Only Alphabets allowed !" /** Applied when Patern String is I */
  ERROR_MSG_STRNG_PATTERN_II = "Only Alpha Numeric allowed !";  /** Applied when Patern String is II, III , IIII */
  ERROR_MSG_STRNG_PATTERN_III = 'Only Alpha-Numeric with some symbols like (!@#$%^&*.()[]=/_ -) allowed !';  /** Applied when Patern String is X */
  ERROR_MSG_STRNG_PATTERN_X = 'Only Alpha-Numeric with some symbols like (-&()".) allowed !';  /** Applied when Patern String is X */
  ERROR_MSG_STRNG_PATTERN_IX = 'Only Alpha-Numeric with some symbols like (-_) allowed.Maxlength 5!';  /** Applied when Patern String is IX */
  ERROR_MSG_STRNG_PATTERN_IIII = 'Only Alpha-Numeric with (&-) Allowed. !';  /** Applied when Patern String is X */
  ERROR_MSG_ALPHA_SPECIAL_PATTERN = 'Invalid pattern.Only alpha special character allowed!';  /** Applied when Patern String is X */
  ERROR_MSG_YEAR = "Enter Valid Year !";  /** Applied when Patern String is II, III , IIII */
  ERROR_MSG_NO = "Only No allowed !";  /** Applied when Pattern String is II, III , IIII */
  //ERROR_MSG_PW = "Min 8 and max 10 characters, at least one uppercase letter, one lowercase letter, one number and one special character";
  ERROR_MSG_PW = "It should not be begin with a no, have min 8 and max 10 characters, at least one alphabet, one no & one special character like _-.&=?;!@#$%^&*";
  ERROR_DOT_NO = "Only . allowed !";  /** Applied when Pattern String is II, III , IIII */

  ERROR_HANDLE_MSG = "Something went wrong, try again later";
  ERROR_PANNO = "Invaild PAN No";  /** Applied when Patern String is PANNO */
  ERROR_GSTINNO = "Invaild GSTIN No";  /** Applied when Patern String is GSTINNO */
  ERROR_IFSCNO = "Invaild IFSC No";  /** Applied when Patern String is IFSCNO */
  ERROR_AADHARNO = "Aadhar No should be 12 digit.";  /** Applied when AADHAR NO */
  //ERROR_FAXNO = "Only Numeric with (-) Allowed. !";  /** Applied when FAX NO */
  ERROR_FAXNO = "Invaild Fax No";  /** Applied when FAX NO */
  ERROR_PHONENO = "Invaild Phone No";  /** Applied when PHONE NO */
  ERROR_MOBILENO = "Invaild Mobile No";  /** Applied when MOBILE NO */
  ERROR_MSG_EMAIL = "Invalid Email Address";
  ERROR_MSG_CODE = "Invalid Pattern.Only a-zA-Z0-9()_/-";
  ERROR_DECIMAL_PATTERN_III = "Only Decimal allowed !" /** Applied when Patern String is I */
  ERROR_FILTER_LIST = "Invalid Pattern.Only a-zA-Z0-9()_-";
  ERROR_LOV_HEADERS = "Invalid Pattern.Only a-zA-Z0-9()-,";
  ERROR_LOV_SIZE = "Invalid Pattern.Only 0-9 ,";
  ERROR_MSG_AIR_JEE = "";
  ERROR_MSG_STATE_JEE = "";
  AIR_JEE = "";

  ERROR_MSG_alphanum_space = 'Only Alpha-Numeric and space are allowed !';
  ERROR_MSG_PATH = 'Only Alpha-Numeric with (/-) Allowed. !'; 
  ERROR_MSG_XII = 'Only Alphabets allowed (_-) Allowed. !'; 
  ERROR_DECIMAL_UPTO_IV = "Invalid pattern. Upto Four Decimal allowed !" /** Applied when Patern String is XVIIII */
 



  /*** 
   * COMMON ERROR MASSAGES
   * ***************/
  CONFIRM_DELETE_MESSAGE = "Do you really want to delete this record ?";


}

/*For Secret Key*/
@Injectable()
export class SecretKey {

  constructor(private getLocalStorageService: GetLocalStorageService,) { }


  encrypt_password(secret: string) {}
  decrypt_password(secret: any) {}



  generateCipherKey(cipherKey: any){
    var cipherString =  new String(cipherKey);
    let cipherLength = cipherString.length;
    var my_string = cipherKey;
    let result="";

    if(cipherLength < 16){
      for(let i = cipherLength ;i < 16; i++){
        result = my_string = my_string+'0';
      }
    }else if(cipherLength > 16){
      result = my_string.slice(0,16);
    }
    return result;
  }

  encryptUsingAES256(secret: any) {
    return secret;
  }
  decryptUsingAES256(secret: any) {
    return secret;
  }

}