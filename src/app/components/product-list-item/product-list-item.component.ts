import { Component, OnInit, Input } from '@angular/core';
import * as Endpoints from './../../services/endpoints.json';
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import { ProductsService } from 'src/app/services/products.service';
import { MatDialog } from '@angular/material';
import { ProductFormComponent } from '../modals/product-form/product-form.component';
import { ImageService } from 'src/app/services/image.service';
import { UsersProductsPageComponent } from 'src/app/pages/users-products-page/users-products-page.component';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-product-list-item',
  templateUrl: './product-list-item.component.html',
  styleUrls: ['./product-list-item.component.scss']
})
export class ProductListItemComponent implements OnInit {

  faEllipsisV = faEllipsisV;

  @Input() product;

  imageUrl;
  priceHRK;

  constructor(
    private productService: ProductsService,
    private imageService: ImageService,
    private userProductsPage: UsersProductsPageComponent,
    private dialog: MatDialog,
    private notificationService: NotificationService) { }

  ngOnInit() {
    console.log(this.product);
    this.getProductImageUrl();
    this.calculateProductPrice();
  }

  private getProductImageUrl() {
    this.imageUrl = this.imageService.getProductImageUrl(this.product.images[0].id);
  }

  private calculateProductPrice() {
    this.priceHRK = this.product.price * 7.56;
  }

  private refreshProduct() {
    this.productService.getProductWithId(this.product.id).subscribe(val => {
      this.product = val;
      this.getProductImageUrl();
      this.calculateProductPrice();
      this.notificationService.showSuccessNotification('Uspjeh!', 'Uspješno ste uredili proizvod.')
    });
  }

  deleteProduct() {
    this.productService.deleteProduct(this.product.id).subscribe(val => {
      this.userProductsPage.getProducts();
    });
  }

  editProduct() {
    const dialogRef = this.dialog.open(ProductFormComponent, {
      width: '1000px',
      data: this.product
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.productService.editProduct(this.product.id, result).subscribe(val => {
          this.refreshProduct();
        });
      }
    });
  }
}
