import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import * as Endpoints from './endpoints.json';

@Injectable({
  providedIn: 'root'
})
export class CategoryGroupService {

  constructor(private http: HttpClient) { }

  getAllCategoryGroups(): Observable<any> {
    return this.http.get(Endpoints.BASE_URL + Endpoints.CATEGORY_GROUP);
  }

  getGroupWithId(groupId): Observable<any> {
    return this.http.get(Endpoints.BASE_URL + Endpoints.CATEGORY_GROUP + groupId);
  }

  deleteCategoryGroup(groupId): Observable<any> {
    return this.http.delete(Endpoints.BASE_URL + Endpoints.CATEGORY_GROUP + groupId);
  }

  getCategoriesFromGroup(groupId): Observable<any> {
    return this.http.get(Endpoints.BASE_URL + Endpoints.CATEGORY_GROUP + groupId + Endpoints.CATEGORIES);
  }

  newCategoryGroup(groupData): Observable<any> {
    return this.http.post(Endpoints.BASE_URL + Endpoints.CATEGORY_GROUP, groupData);
  }

  editCategoryGroup(groupId, groupData): Observable<any> {
    return this.http.put(Endpoints.BASE_URL + Endpoints.CATEGORY_GROUP + groupId, groupData);
  }

}
