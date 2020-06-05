import { Injectable } from '@angular/core';
import * as Endpoints from "./endpoints.json";
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CouponService {

  constructor(private http: HttpClient) { }

  getUsersCoupons(userId): Observable<any> {
    return this.http.get(
      Endpoints.BASE_URL + Endpoints.USERS + userId + Endpoints.COUPONS
    );
  }

  addNewCoupon(data): Observable<any> {
    return this.http.post(
      Endpoints.BASE_URL + Endpoints.COUPONS, data
    );
  }

  getCouponByName(name): Observable<any> {
    return this.http.get(
      Endpoints.BASE_URL + Endpoints.COUPONS + name
    );
  }
}
