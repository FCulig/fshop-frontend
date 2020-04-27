import { Injectable } from '@angular/core';
import * as Endpoints from './endpoints.json';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) { }

  /*(user: any): Observable<any> {
    return this.http.post<any>(Endpoints.BASE_URL + Endpoints.REGISTER, user);
  }*/

  getAllCategories(): Observable<any> {
    return this.http.get(Endpoints.BASE_URL + Endpoints.CATEGORIES);
  }
}
