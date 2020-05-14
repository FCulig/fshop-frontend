import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NavigationLogoutService {

  private logout = new Subject<string>();
  logout$ = this.logout.asObservable();

  constructor() { }

  sendLogout(m) {
    this.logout.next(m);
  }
}
