import { Injectable } from '@angular/core';

import * as Endpoints from './endpoints.json';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private http: HttpClient) { }

  addItemToCart(cartId, productId, quantity): Observable<any> {
    return this.http.post(Endpoints.BASE_URL + Endpoints.PRODUCTS + productId + Endpoints.CART + cartId, { quantity });
  }

  getUsersCart(userId): Observable<any> {
    return this.http.get(Endpoints.BASE_URL + Endpoints.USERS + userId + Endpoints.CART);
  }

  removeItemFromCart(itemId): Observable<any> {
    return this.http.delete(Endpoints.BASE_URL + Endpoints.CART_ITEM + itemId);
  }
}
