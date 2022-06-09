import { Injectable } from '@angular/core';
import { NotifierService } from 'angular-notifier';

@Injectable()
export class NotificationServices {

  private readonly notifier: NotifierService;
  constructor(private notifierService: NotifierService) {
    this.notifier = notifierService;
  }
  /**
   * 
   * @param type Type of error to be shown
   * @param msg Erro message to be shown
   */

  public showNotification(type, msg) {
    this.notifier.notify(type, msg);
  }
}
