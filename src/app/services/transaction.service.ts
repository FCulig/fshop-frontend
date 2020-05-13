import { Injectable } from '@angular/core';
import * as Endpoints from './endpoints.json';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  constructor(private http: HttpClient) { }

  newTransaction(data): Observable<any> {
    return this.http.post(Endpoints.BASE_URL + Endpoints.TRANSACTIONS, data);
  }

  getUsersTransactions(userId): Observable<any> {
    return this.http.get(Endpoints.BASE_URL + Endpoints.USERS + userId + Endpoints.TRANSACTIONS);
  }

  getUsersTransactionsWithStauts(userId, statusId): Observable<any> {
    return this.http.get(Endpoints.BASE_URL + Endpoints.USERS + userId + Endpoints.TRANSACTIONS + '?type=' + statusId);
  }

  cancelTransaction(transactionId): Observable<any> {
    return this.http.put(Endpoints.BASE_URL + Endpoints.TRANSACTIONS + transactionId + Endpoints.CANCEL, '');
  }

  shipTransaction(transactionId): Observable<any> {
    return this.http.put(Endpoints.BASE_URL + Endpoints.TRANSACTIONS + transactionId + Endpoints.SHIP, '');
  }

  getUsersOrders(userId): Observable<any> {
    return this.http.get(Endpoints.BASE_URL + Endpoints.USERS + userId + Endpoints.ORDERS);
  }

  getUsersOrdersWithStatus(statusId, userId): Observable<any> {
    return this.http.get(Endpoints.BASE_URL + Endpoints.USERS + userId + Endpoints.ORDERS + '?type=' + statusId);
  }
}
