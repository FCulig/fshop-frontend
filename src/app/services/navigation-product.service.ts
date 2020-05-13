import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NavigationProductService {

  private refreshSource = new Subject<string>();
  refresh$ = this.refreshSource.asObservable();

  constructor() { }

  sendRefresh(m){
    this.refreshSource.next(m);
    
  }

}
