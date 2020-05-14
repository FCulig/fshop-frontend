import { Injectable } from '@angular/core';

import * as Endpoints from './endpoints.json';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PromotionRequestsService {

  constructor(private http: HttpClient) { }

  newPromotionRequest(userId): Observable<any> {
    return this.http.post(Endpoints.BASE_URL + Endpoints.PROMOTION_REQUEST, { user_id: userId });
  }

  getAllPromotionRequests(): Observable<any> {
    return this.http.get(Endpoints.BASE_URL + Endpoints.PROMOTION_REQUEST);
  }

  approveRequest(requestId): Observable<any> {
    return this.http.put(Endpoints.BASE_URL + Endpoints.PROMOTION_REQUEST + requestId + Endpoints.APPROVE, '');
  }

  declineRequest(requestId): Observable<any> {
    return this.http.put(Endpoints.BASE_URL + Endpoints.PROMOTION_REQUEST + requestId + Endpoints.DECLINE, '');
  }

  isUserElegableForPromotion(userId): Observable<any> {
    return this.http.get(Endpoints.BASE_URL + Endpoints.USERS + userId + Endpoints.CAN_PROMOTE);
  }

}
