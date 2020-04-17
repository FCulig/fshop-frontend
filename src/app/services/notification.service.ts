import { Injectable } from '@angular/core';
import { NotificationsService } from 'angular2-notifications';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private notification: NotificationsService) { }

  showErrorNotification(title: string, message: string) {
    this.notification.error(title, message, {
      timeOut: 8000,
      showProgressBar: false,
      pauseOnHover: true,
      clickToClose: true,
      clickIconToClose: true
    });
  }

  showSuccessNotification(title: string, message: string) {
    this.notification.success(title, message, {
      timeOut: 8000,
      showProgressBar: false,
      pauseOnHover: true,
      clickToClose: true,
      clickIconToClose: true
    });
  }
}
