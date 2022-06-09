import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { CheckboxModule } from 'primeng/checkbox';
import { ChipsModule } from 'primeng/chips';
import { RatingModule } from 'primeng/rating';
import { ButtonModule } from 'primeng/button';
import { PanelModule } from 'primeng/panel';
import { DialogModule } from 'primeng/dialog';
import { BlockUIModule } from 'primeng/blockui';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { InputSwitchModule } from 'primeng/inputswitch';
import { TableModule } from 'primeng/table';
import { MultiSelectModule } from 'primeng/multiselect';

import { CalendarModule } from 'primeng/calendar';
import { RadioButtonModule } from 'primeng/radiobutton';
import { SplitButtonModule } from 'primeng/splitbutton';
import { RouterModule, Routes } from '@angular/router';
import { ToolbarModule } from 'primeng/toolbar';
import { TooltipModule } from 'primeng/tooltip';
import { AccordionModule } from 'primeng/accordion';
import { FieldsetModule } from 'primeng/fieldset';
import { FileUploadModule } from 'primeng/fileupload';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { DropdownModule } from 'primeng/dropdown';
import { SelectButtonModule } from 'primeng/selectbutton';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { CardModule } from 'primeng/card';
import { ChartModule } from 'primeng/chart';
import { TabViewModule } from 'primeng/tabview';
import { PickListModule } from 'primeng/picklist';
import { InputMaskModule } from 'primeng/inputmask';
import {GMapModule} from 'primeng/gmap';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    InputTextModule,
    CheckboxModule,
    ChipsModule,
    RatingModule,
    ButtonModule,
    PanelModule,
    DialogModule,
    BlockUIModule,
    ConfirmDialogModule,
    InputSwitchModule,
    TableModule,
    MultiSelectModule,
    CalendarModule,
    RadioButtonModule,
    SplitButtonModule,
    RouterModule,
    ToolbarModule,
    TooltipModule,
    AccordionModule,
    FieldsetModule,
    FileUploadModule,
    AutoCompleteModule,
    DropdownModule,
    SelectButtonModule,
    ToggleButtonModule,
    CardModule,
    ChartModule,
    TabViewModule,
    PickListModule,
    InputMaskModule,
    GMapModule

  ],
  exports: [
    InputTextModule,
    CheckboxModule,
    ChipsModule,
    RatingModule,
    ButtonModule,
    PanelModule,
    DialogModule,
    ToastModule,
    ConfirmDialogModule,
    InputSwitchModule,
    TableModule,
    MultiSelectModule,
    CalendarModule,
    RadioButtonModule,
    SplitButtonModule,
    RouterModule,
    ToolbarModule,
    TooltipModule,
    AccordionModule,
    FieldsetModule,
    FileUploadModule,
    DropdownModule,
    SelectButtonModule,
    AutoCompleteModule,
    ToggleButtonModule,
    CardModule,
    ChartModule,
    TabViewModule,
    PickListModule,
    InputMaskModule,
    GMapModule
    // ConfirmationService
  ],
  providers: [],
})
export class PrimefacesModule { }
