import { Component, AfterViewChecked, Renderer2, ChangeDetectorRef, HostListener } from '@angular/core';
import { GLOBAL_CONSTANTS } from './core/services/global.constants';
import * as $ from 'jquery';
import * as AdminLte from 'admin-lte';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'newHospyCare';


  constructor(public GLOBAL_CONSTANTS: GLOBAL_CONSTANTS,
              private renderer : Renderer2,
              private cdRef: ChangeDetectorRef,) {}

  ngAfterViewChecked() {
    if (this.GLOBAL_CONSTANTS.LOADER_FLAG == true) { // check if it change, tell CD update view
      this.cdRef.detectChanges();
    }
  }

  ngOnInit(){
    AdminLte.Treeview._jQueryInterface.call($(this), 'init');
    this.setBackgroundImage();
  }


  setBackgroundImage() {
    // this.renderer.setStyle(document.body, 'background', "url(assets/img/backgroundWatermark.jpg) no-repeat center center fixed ");
    // this.renderer.setStyle(document.body, 'background-size', "cover");
    // this.renderer.setStyle(document.body, 'background-color', "rgba(255,255,255,0.5");
    // this.renderer.setStyle(document.body, 'background-blend-mode', "lighten");
}
}
