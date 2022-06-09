import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { AccordionModule } from 'primeng/accordion';   
import { HttpServices } from './core/services/http-service.service';
import { NavigationService } from './core/services/navigation-service.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PrimefacesModule } from './core/modules/primefaces.module';
import { AppRoutingModule } from './app-routing.module';
import { InventoryModule } from './modules/inventory/inventory.module'
import { GetLocalStorageService } from './core/services/get-local-storage.service';
import { HttpClientModule, HTTP_INTERCEPTORS, HttpClientXsrfModule } from '@angular/common/http';
import { HttpInterceptorService } from './core/services/http-interceptor-service.service';
import { ErrorInterceptorService } from './core/services/error-interceptor.service';
import { NotifierModule, NotifierOptions } from 'angular-notifier';
import { ModalModule } from 'ngx-bootstrap/modal';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { LocationStrategy, HashLocationStrategy, CommonModule } from '@angular/common';
import { ConfigService } from './core/services/config.service';
import { AuthService } from './core/Authentication/auth.service';
import { AuthGuardService } from './core/Authentication/auth-guard.service';
import { LoaderDirective } from './core/diectives/loader.directive';
import { GLOBAL_CONSTANTS } from './core/services/global.constants';
import { MyDatePickerModule } from 'mydatepicker';
import { CustomerComponent } from './modules/inventory/components/customer/customer.component';
// import { SampleCustomerComponent } from './modules/inventory/components/sample-customer/sample-customer.component';
// import { SampleCustomerComponent } from './sample-customer/sample-customer.component';


/*Custom Angular Notifier Starts*/
const customNotifierOptions: NotifierOptions = {
  position: {
    horizontal: {
      position: 'right',
      distance: 12
    },
    vertical: {
      position: 'top',
      distance: 12,
      gap: 10
    }
  },
  theme: 'material',
  behaviour: {
    autoHide: 5000,
    onClick: 'hide',
    onMouseover: 'pauseAutoHide',
    showDismissButton: true,
    stacking: 4
  },
  animations: {
    enabled: true,
    show: {
      preset: 'slide',
      speed: 300,
      easing: 'ease'
    },
    hide: {
      preset: 'fade',
      speed: 300,
      easing: 'ease',
      offset: 50
    },
    shift: {
      speed: 300,
      easing: 'ease'
    },
    overlap: 150
  }
};
/*Custom Angular Notifier Ends*/


@NgModule({
  declarations: [
    AppComponent,
    LoaderDirective
    // SampleCustomerComponent
    
  ],
  entryComponents: [LoaderDirective],
  imports: [
    CommonModule,
    BrowserModule,
    AccordionModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    PrimefacesModule,
    AppRoutingModule,
    InventoryModule,
    HttpClientModule,
    MyDatePickerModule,
    HttpClientXsrfModule.withOptions({
      cookieName: 'My-Xsrf-Cookie',
      headerName: 'My-Xsrf-Header',
    }),

    NgMultiSelectDropDownModule.forRoot(),
    NotifierModule.withConfig(customNotifierOptions),
    ModalModule.forRoot(),

  ],
  providers: [
    HttpServices,
    NavigationService,
    AuthService,
    AuthGuardService,
    {
        provide: LocationStrategy,
        useClass: HashLocationStrategy
    },
    { provide: HTTP_INTERCEPTORS, useClass: HttpInterceptorService, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptorService, multi: true },
    GetLocalStorageService,
    GLOBAL_CONSTANTS,
    ConfigService,

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
