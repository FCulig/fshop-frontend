import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RefreshUsersProductsService {

  private refresh = new Subject<string>();
  refresh$ = this.refresh.asObservable();

  constructor() { }

  sendRefresh(m) {
    this.refresh.next(m);
  }

}
