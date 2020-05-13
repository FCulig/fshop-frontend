import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import * as Endpoints from './endpoints.json';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor(private http: HttpClient) { }

  getRoleWithId(roleId): Observable<any> {
    return this.http.get(Endpoints.BASE_URL + Endpoints.ROLES + roleId);
  }
}
