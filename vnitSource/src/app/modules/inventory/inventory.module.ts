import { NgModule, NO_ERRORS_SCHEMA, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { InventoryRoutingModule, InventoryComponents, Directives } from './inventory-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PrimefacesModule } from '../../core/modules/primefaces.module';
import { CrudService } from '../../common/services/crud.service';
import { NotificationServices } from '../../core/services/notification-service.service';
import { RegExpressionService } from '../../core/services/config.service';
import { GLOBAL_CONSTANTS } from '../../core/services/global.constants';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { MyDatePickerModule } from 'mydatepicker';
import { CommonSharedModule } from 'src/app/common/common-shared/common-shared.module';
import { TestComponent } from './components/test/test.component';
import { ScreenComponent } from './components/screen/screen.component';
import { ScreenlistComponent } from './components/screenlist/screenlist.component';
import { ScreenjoinconditionComponent } from './components/screenjoincondition/screenjoincondition.component';
import { ScreenmappingconditionComponent } from './components/screenmappingcondition/screenmappingcondition.component';
import { ScreenmappingqueryComponent } from './components/screenmappingquery/screenmappingquery.component';
import { EventmasterComponent } from './components/eventmaster/eventmaster.component';
import { ScreeneventComponent } from './components/screenevent/screenevent.component';
import { ScreenfieldmasterComponent } from './components/screenfieldmaster/screenfieldmaster.component';
import { DownloadScreenComponent } from './components/download-screen/download-screen.component';
@NgModule({
  declarations: [
    InventoryComponents,
    Directives,
    TestComponent,
    ScreenComponent,
    ScreenlistComponent,
    ScreenjoinconditionComponent,
    ScreenmappingconditionComponent,
    ScreenmappingqueryComponent,
    EventmasterComponent,
    ScreeneventComponent,
    ScreenfieldmasterComponent,
    DownloadScreenComponent
    
  ],
  imports: [
    CommonModule,
    InventoryRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgMultiSelectDropDownModule,
    MyDatePickerModule,
    PrimefacesModule,
    CommonSharedModule
  ],
  providers: [
    CrudService,
    NotificationServices,
    GLOBAL_CONSTANTS,
    RegExpressionService,
    DatePipe
  ],
  schemas: []
})

export class InventoryModule implements OnInit {
  constructor(public GLOBAL_CONSTANTS: GLOBAL_CONSTANTS) {
  }
  ngOnInit() {
  }
}
