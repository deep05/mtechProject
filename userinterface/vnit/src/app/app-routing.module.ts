import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomerComponent } from './modules/inventory/components/customer/customer.component';

const routes: Routes = [
  
 { path: '', loadChildren: () => import(`./modules/inventory/inventory.module`).then(m => m.InventoryModule) },
// {
//   path:'',
//   component:CustomerComponent,
//   pathMatch:"full"

// }
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }








