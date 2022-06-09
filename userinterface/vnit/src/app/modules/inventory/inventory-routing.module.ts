import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { InventoryComponent } from './inventory.component';
import { AuthGuardService } from '../../core/Authentication/auth-guard.service';
import { InventoryIndexComponent } from '../../common/common-component/inventory-index/inventory-index.component'
import { ErrorComponent } from 'src/app/common/common-component/error/error.component';
import {ItemMasterComponent } from './components/item-master/item-master.component';
import { DownloadScreenComponent } from './components/download-screen/download-screen.component';
import { BillTypeMasterComponent } from './components/bill-type-master/bill-type-master.component';
import { BillEntryComponent } from './components/bill-entry/bill-entry.component';
import { SampleCustomerComponent } from './components/sample-customer/sample-customer.component';
import { ScreenComponent } from './components/screen/screen.component';
import { ScreenlistComponent } from './components/screenlist/screenlist.component';
import { ScreenjoinconditionComponent } from './components/screenjoincondition/screenjoincondition.component';
import { ScreenmappingconditionComponent } from './components/screenmappingcondition/screenmappingcondition.component';
import { EventmasterComponent } from './components/eventmaster/eventmaster.component';
import { ScreenmappingqueryComponent } from './components/screenmappingquery/screenmappingquery.component';
import { ScreeneventComponent } from './components/screenevent/screenevent.component';
import { ScreenfieldmasterComponent } from './components/screenfieldmaster/screenfieldmaster.component';
import { DownloadComponent } from './components/download/download.component';

let routesArray: Array<any> = [
    {
        path: "",
        component: InventoryIndexComponent,
        canActivateChild: [AuthGuardService],
    },
    {
        path: "item-master",
        component: ItemMasterComponent,
        canActivateChild: [AuthGuardService],
    },
    {
        path: "download-screen",
        component: DownloadScreenComponent,
        canActivateChild: [AuthGuardService],
    },
    {
        path: "download",
        component: DownloadComponent,
        canActivateChild: [AuthGuardService],
    },
    {
        path: "sample-customer",
        component: SampleCustomerComponent,
        canActivateChild: [AuthGuardService],
    },
    {
        path: "screen",
        component: ScreenComponent,
        canActivateChild: [AuthGuardService],
    },
    {
        path: "screenlist",
        component: ScreenlistComponent,
        canActivateChild: [AuthGuardService],
    },{
        path: "screenjoincondition",
        component: ScreenjoinconditionComponent,
        canActivateChild: [AuthGuardService],
    },
    {
        path: "bill-type-master",
        component: BillTypeMasterComponent,
        canActivateChild: [AuthGuardService],
    },
    {
        path: "bill-entry",
        component: BillEntryComponent,
        canActivateChild: [AuthGuardService],
    },
    {
        path: "bill-entry-with-bill-type",
        component: BillEntryComponent,
        canActivateChild: [AuthGuardService],
    },
    {
        path: "screenmappingcondition",
        component: ScreenmappingconditionComponent,
        canActivateChild: [AuthGuardService],
    },
    {
        path: "screenfieldmaster",
        component: ScreenfieldmasterComponent,
        canActivateChild: [AuthGuardService],
    },
    {
        path: "eventmaster",
        component: EventmasterComponent,
        canActivateChild: [AuthGuardService],
    },
    {
        path: "screenevent",
        component: ScreeneventComponent,
        canActivateChild: [AuthGuardService],
    },
    {
        path: "screenmappingquery",
        component: ScreenmappingqueryComponent,
        canActivateChild: [AuthGuardService],
    },{
        path: "**",
        component: ErrorComponent,
        canActivateChild: [AuthGuardService],
    }
];

const routes: any = [
    {
        path: '',
        component: InventoryComponent,
        children: routesArray
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class InventoryRoutingModule { }

export const InventoryComponents = [
    InventoryComponent,
    InventoryIndexComponent,
    ItemMasterComponent,
    DownloadScreenComponent,
    BillTypeMasterComponent,
    BillEntryComponent,
    SampleCustomerComponent,
    ScreenComponent,
    ScreenlistComponent,
    ScreenjoinconditionComponent,
    ScreenmappingconditionComponent,
    ScreenmappingqueryComponent,
    EventmasterComponent,
    ScreeneventComponent,
    ScreenfieldmasterComponent,
    
    
]

export const Directives = []