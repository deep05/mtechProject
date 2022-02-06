import { Directive, Component, Input } from '@angular/core';


@Component({
  selector: 'loader',
  template: `
  <span *ngIf="flag == true" class="loading"></span>`
})

export class LoaderDirective {
  @Input() flag: boolean;

  constructor() {
    if (this.flag == true)
      setTimeout(() => {
        return this.flag = false;
      }, 2500)
  }

}
