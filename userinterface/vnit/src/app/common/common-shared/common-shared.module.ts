import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { PrimefacesModule } from 'src/app/core/modules/primefaces.module';
import { HeaderComponent } from '../common-component/header/header.component';
import { FooterComponent } from '../common-component/footer/footer.component';
import { ErrorComponent } from '../common-component/error/error.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SearchFilterPipe } from '../../core/pipes/search-filter.pipe';
@NgModule({
  imports: [
    CommonModule,
    PrimefacesModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [
    FooterComponent,
    HeaderComponent,
    ErrorComponent,
    SearchFilterPipe,
  ],
  exports: [
    FooterComponent,
    HeaderComponent,
    ErrorComponent,
    PrimefacesModule,
  ],
  entryComponents: [
    FooterComponent,
    HeaderComponent,
    ErrorComponent,
    PrimefacesModule,
  ]
})
export class CommonSharedModule {

  static forRoot() {
    return {
      ngModule: CommonSharedModule,
    }
  }
}
