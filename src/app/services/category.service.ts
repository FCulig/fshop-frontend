import { Injectable } from '@angular/core';
import * as Endpoints from './endpoints.json';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) { }

  getAllCategories(): Observable<any> {
    return this.http.get(Endpoints.BASE_URL + Endpoints.CATEGORIES);
  }

  newCategory(categoryData): Observable<any> {
    return this.http.post(Endpoints.BASE_URL + Endpoints.CATEGORIES, categoryData);
  }

  editCategory(categoryId, categoryData): Observable<any> {
    return this.http.put(Endpoints.BASE_URL + Endpoints.CATEGORIES + categoryId, categoryData);
  }

  deleteCateogry(categoryId): Observable<any> {
    return this.http.delete(Endpoints.BASE_URL + Endpoints.CATEGORIES + categoryId);
  }
}
