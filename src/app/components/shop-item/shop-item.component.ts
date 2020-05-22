import { Component, OnInit, Input } from '@angular/core';
import { ImageService } from 'src/app/services/image.service';

@Component({
  selector: 'app-shop-item',
  templateUrl: './shop-item.component.html',
  styleUrls: ['./shop-item.component.scss']
})
export class ShopItemComponent implements OnInit {

  @Input() product;

  constructor(
    private imageService: ImageService
  ) { }

  ngOnInit(): void {
  }

  getProductImageUrl() {
    return this.imageService.getProductImageUrl(this.product.images[0].id);
  }
}
