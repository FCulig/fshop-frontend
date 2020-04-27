import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from 'src/app/services/products.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { MatDialog } from '@angular/material';
import { ProductFormComponent } from 'src/app/components/modals/product-form/product-form.component';
import { NotificationService } from 'src/app/services/notification.service';

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
    private ngxService: NgxUiLoaderService,
    private dialog: MatDialog,
    private notificationService: NotificationService
  ) { }

  ngOnInit() {
    this.startLoader();
    this.userId = this.route.snapshot.paramMap.get('id');
    this.getProducts(true);
  }

  getProducts(isInitialGet?: boolean) {
    this.productsService.getUsersProducts(this.userId).subscribe(val => {
      this.products = val;
      this.isLoaded = true;
      this.stopLoader();
      if (!isInitialGet) {
        this.notificationService.showSuccessNotification('Uspjeh!', 'Uspješno ste dodali novi proizvod!');
      }
    });
  }

  startLoader() {
    this.ngxService.start();
  }

  stopLoader() {
    this.ngxService.stop();
  }

  openProductForm() {
    const dialogRef = this.dialog.open(ProductFormComponent, {
      width: '1000px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.startLoader();
        this.productsService.newProduct(result).subscribe(val => {
          this.getProducts();
        });
      }
    });
  }

}
