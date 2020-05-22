import { Component, OnInit, Input } from '@angular/core';
import * as Endpoints from './../../services/endpoints.json';
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import { ProductsService } from 'src/app/services/products.service';
import { MatDialog } from '@angular/material';
import { ProductFormComponent } from '../modals/product-form/product-form.component';
import { ImageService } from 'src/app/services/image.service';
import { UsersProductsPageComponent } from 'src/app/pages/users-products-page/users-products-page.component';
import { NotificationService } from 'src/app/services/notification.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { RefreshUsersProductsService } from 'src/app/services/refresh-users-products.service';
import { RestockProductFormComponent } from '../modals/restock-product-form/restock-product-form.component';

@Component({
  selector: 'app-product-list-item',
  templateUrl: './product-list-item.component.html',
  styleUrls: ['./product-list-item.component.scss']
})
export class ProductListItemComponent implements OnInit {

  faEllipsisV = faEllipsisV;

  @Input() product;
  @Input() isRestockable;

  imageUrl;
  roleId;

  constructor(
    private productService: ProductsService,
    private imageService: ImageService,
    private userProductsPage: UsersProductsPageComponent,
    private dialog: MatDialog,
    private notificationService: NotificationService,
    private authenticationService: AuthenticationService,
    private refreshProducts: RefreshUsersProductsService
  ) { }

  ngOnInit() {
    console.log(this.product);
    this.roleId = this.authenticationService.currentUserValue.user.role_id;
    this.getProductImageUrl();
  }

  private getProductImageUrl() {
    this.imageUrl = this.imageService.getProductImageUrl(this.product.images[0].id);
  }

  private refreshProduct(isRestock: boolean) {
    this.productService.getProductWithId(this.product.id).subscribe(val => {
      this.product = val;
      this.getProductImageUrl();
      if (isRestock) {
        this.notificationService.showSuccessNotification('Uspjeh!', 'Uspješno ste obnovili zalihu proizvoda!');
      } else {
        this.notificationService.showSuccessNotification('Uspjeh!', 'Uspješno ste uredili proizvod.');
      }
    });
  }

  deleteProduct() {
    this.productService.deleteProduct(this.product.id).subscribe(val => {
      this.userProductsPage.getProducts();
    });
  }

  userRestock() {
    this.productService.restockProduct(this.product.id, 1).subscribe(val => {
      if (val.id) {
        this.refreshProducts.sendRefresh(val.id);
        this.notificationService.showSuccessNotification('Uspjeh!', 'Uspješno ste obnovili zalihu proizvoda!');
      }
    });
  }

  shopRestock() {
    const dialogRef = this.dialog.open(RestockProductFormComponent, {
      width: '1000px',
      data: this.product
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.productService.restockProduct(this.product.id, result).subscribe(val => {
          if (val) {
            this.refreshProduct(true);
          }
        });
      }
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
          this.refreshProduct(false);
        });
      }
    });
  }
}
