import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from 'src/app/services/products.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { MatDialog } from '@angular/material';
import { ProductFormComponent } from 'src/app/components/modals/product-form/product-form.component';
import { NotificationService } from 'src/app/services/notification.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { RefreshUsersProductsService } from 'src/app/services/refresh-users-products.service';

@Component({
  selector: 'app-users-products-page',
  templateUrl: './users-products-page.component.html',
  styleUrls: ['./users-products-page.component.scss']
})
export class UsersProductsPageComponent implements OnInit {

  userId;
  products;
  isLoaded = false;
  constructor(
    private route: ActivatedRoute,
    private productsService: ProductsService,
    private dialog: MatDialog,
    private notificationService: NotificationService,
    private authenticationService: AuthenticationService,
    private refreshProducts: RefreshUsersProductsService
  ) { }

  ngOnInit() {
    this.userId = this.route.snapshot.paramMap.get('id');
    this.getProducts(true);
    this.refreshProducts.refresh$.subscribe(val => {
      this.getProducts(true);
    });
  }

  getProducts(isInitialGet?: boolean) {
    this.productsService.getUsersProducts(this.userId).subscribe(val => {
      this.products = val;
      this.isLoaded = true;
      if (!isInitialGet) {
        this.notificationService.showSuccessNotification('Uspjeh!', 'Uspješno ste dodali novi proizvod!');
      }
    });
  }

  openProductForm() {
    if (this.canAddNewProduct()) {
      const dialogRef = this.dialog.open(ProductFormComponent, {
        width: '1000px'
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.productsService.newProduct(result).subscribe(val => {
            this.getProducts();
          });
        }
      });
    }
  }

  canAddNewProduct() {
    let canAdd = true;

    if (this.authenticationService.currentUserValue.user.role_id == 3 && this.getNumberOfActiveProducts() == 1) {
      this.notificationService.showErrorNotification('Ne možete dodati novi proizvod!', 'Da bi omogućili prodaju više proizvoda istovremeno, zatražite promociju u trgovinu!');
      canAdd = false;
    }

    return canAdd;
  }

  getNumberOfActiveProducts() {
    if (this.products.length == 0) {
      return 0;
    } else {
      let active = 0;
      this.products.forEach(product => {
        if (product.quantity > 0) {
          active++;
        }
      });

      return active;
    }
  }

}
