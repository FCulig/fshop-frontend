import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as Endpoints from './endpoints.json';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  registerUser(user: any): Observable<any> {
    return this.http.post<any>(Endpoints.BASE_URL + Endpoints.REGISTER, user);
  }

  getUserWithId(userId: number): Observable<any> {
    return this.http.get(Endpoints.BASE_URL + Endpoints.USERS + userId);
  }

  getAllUsers(): Observable<any> {
    return this.http.get(Endpoints.BASE_URL + Endpoints.USERS);
  }

  deleteUser(userId): Observable<any> {
    return this.http.delete(Endpoints.BASE_URL + Endpoints.USERS + userId);
  }

  promoteUser(userId): Observable<any> {
    return this.http.put(Endpoints.BASE_URL + Endpoints.USERS + userId + Endpoints.PROMOTE, '');
  }

  demoteUser(userId): Observable<any> {
    return this.http.put(Endpoints.BASE_URL + Endpoints.USERS + userId + Endpoints.DEMOTE, '');
  }

  editUser(userId, userData): Observable<any> {
    return this.http.post(Endpoints.BASE_URL + Endpoints.USERS + userId, userData);
  }

  changeUsersPassword(userId, data): Observable<any> {
    return this.http.put(Endpoints.BASE_URL + Endpoints.USERS + userId + Endpoints.CHANGE_PASSWORD, data);
  }

  getUsersProfit(userId): Observable<any> {
    return this.http.get(Endpoints.BASE_URL + Endpoints.USERS + userId + Endpoints.PROFIT);
  }
}
