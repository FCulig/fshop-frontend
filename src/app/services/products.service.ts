import { Injectable } from '@angular/core';
import * as Endpoints from './endpoints.json';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http: HttpClient) { }

  getProductWithId(productId): Observable<any> {
    return this.http.get(Endpoints.BASE_URL + Endpoints.PRODUCTS +  productId);
  }

  getUsersProducts(userId): Observable<any> {
    return this.http.get(Endpoints.BASE_URL + Endpoints.USERS + '/' + userId + Endpoints.USERS_PRODUCTS_EXT);
  }

  editProduct(productId, product) {
    return this.http.post(Endpoints.BASE_URL + Endpoints.PRODUCTS + productId, product);
  }

  newProduct(product) {
    return this.http.post(Endpoints.BASE_URL + Endpoints.PRODUCTS, product);
  }

  deleteProduct(productId){
    return this.http.delete(Endpoints.BASE_URL + Endpoints.PRODUCTS + productId);
  }
}
