import { Injectable } from "@angular/core";
import * as Endpoints from "./endpoints.json";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class ProductsService {
  constructor(private http: HttpClient) { }

  getAllProducts(): Observable<any> {
    return this.http.get(Endpoints.BASE_URL + Endpoints.PRODUCTS);
  }

  getHomePageProducts(): Observable<any> {
    return this.http.get(
      Endpoints.BASE_URL + Endpoints.PRODUCTS + Endpoints.HOME_PAGE
    );
  }

  getFilteredProducts(queryParameters): Observable<any> {
    return this.http.get(
      Endpoints.BASE_URL + Endpoints.PRODUCTS + queryParameters
    );
  }

  getProductWithId(productId): Observable<any> {
    return this.http.get(Endpoints.BASE_URL + Endpoints.PRODUCTS + productId);
  }

  getUsersProducts(userId): Observable<any> {
    return this.http.get(
      Endpoints.BASE_URL +
      Endpoints.USERS +
      userId +
      Endpoints.USERS_PRODUCTS_EXT
    );
  }

  editProduct(productId, product): Observable<any> {
    return this.http.post(
      Endpoints.BASE_URL + Endpoints.PRODUCTS + productId,
      product
    );
  }

  newProduct(product): Observable<any> {
    return this.http.post(Endpoints.BASE_URL + Endpoints.PRODUCTS, product);
  }

  deleteProduct(productId): Observable<any> {
    return this.http.delete(
      Endpoints.BASE_URL + Endpoints.PRODUCTS + productId
    );
  }

  restockProduct(productId, quantity): Observable<any> {
    return this.http.put(
      Endpoints.BASE_URL + Endpoints.PRODUCTS + productId + Endpoints.RESTOCK,
      { quantity }
    );
  }
}
