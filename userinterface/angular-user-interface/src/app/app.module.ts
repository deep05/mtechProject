import { HttpClientModule, HttpClientXsrfModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NotifierModule, NotifierOptions } from 'angular-notifier';
import { AccordionModule } from 'primeng/accordion';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoaderDirective } from './core/diectives/loader.directive';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PrimefacesModule } from './core/modules/primefaces.module';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { ModalModule, BsModalService } from 'ngx-bootstrap/modal'; 
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { AuthGuardService } from './core/Authentication/auth-guard.service';
import { AuthService } from './core/Authentication/auth.service';
import { ConfigService } from './core/services/config.service';
import { ErrorInterceptorService } from './core/services/error-interceptor.service';
import { GetLocalStorageService } from './core/services/get-local-storage.service';
import { GLOBAL_CONSTANTS } from './core/services/global.constants';
import { HttpInterceptorService } from './core/services/http-interceptor-service.service';
import { HttpServices } from './core/services/http-service.service';
import { NavigationService } from './core/services/navigation-service.service';

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

@NgModule({
  declarations: [
    AppComponent,
    LoaderDirective
  ],
  entryComponents: [LoaderDirective],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AccordionModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    PrimefacesModule,
    HttpClientXsrfModule.withOptions({
      cookieName: 'My-Xsrf-Cookie',
      headerName: 'My-Xsrf-Header',
    }),

    NgMultiSelectDropDownModule.forRoot(),
    NotifierModule.withConfig(customNotifierOptions),
    ModalModule.forRoot(),
  ],
  providers: [HttpServices,
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
