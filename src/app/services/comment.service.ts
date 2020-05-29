import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import * as Endpoints from "./endpoints.json";

@Injectable({
  providedIn: "root"
})
export class CommentService {
  constructor(private http: HttpClient) { }

  getCommentsOnProduct(productId): Observable<any> {
    return this.http.get(
      Endpoints.BASE_URL + Endpoints.PRODUCTS + productId + Endpoints.COMMENTS
    );
  }

  commentOnProduct(productId, comment): Observable<any> {
    return this.http.post(
      Endpoints.BASE_URL + Endpoints.PRODUCTS + productId + Endpoints.COMMENTS,
      comment
    );
  }

  deleteComment(commentId): Observable<any> {
    return this.http.delete(
      Endpoints.BASE_URL + Endpoints.COMMENTS + commentId
    );
  }

  getLatestCommentsOnUsersProducts(userId): Observable<any> {
    return this.http.get(
      Endpoints.BASE_URL + Endpoints.USERS + userId + Endpoints.LATEST_COMMENTS
    );
  }
}
