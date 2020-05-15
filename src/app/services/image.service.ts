import { Injectable } from '@angular/core';
import * as Endpoints from './endpoints.json';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor() { }

  getProductImageUrl(imageId) {
    return Endpoints.BASE_URL + Endpoints.PRODUCT_IMAGE + imageId;
  }

  getCategoryImageUrl(imageName) {
    return Endpoints.BASE_URL + Endpoints.CATEGORY_IMAGE + imageName;
  }
}
