import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from 'src/app/services/products.service';
import { ImageService } from 'src/app/services/image.service';
import { url } from 'inspector';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NotificationService } from 'src/app/services/notification.service';
import { CartService } from 'src/app/services/cart.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { NavigationBarComponent } from 'src/app/components/navigation-bar/navigation-bar.component';
import { NavigationProductService } from 'src/app/services/navigation-product.service';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.scss']
})
export class ProductPageComponent implements OnInit {

  productId;
  product;
  imgUrls;

  quantityForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductsService,
    private imageService: ImageService,
    private fb: FormBuilder,
    private notificationSerivce: NotificationService,
    private cartService: CartService,
    private authenticationService: AuthenticationService,
    private router: Router,
    private navigationProductService: NavigationProductService
  ) { }

  ngOnInit(): void {
    this.productId = this.route.snapshot.paramMap.get('id');
    this.getProduct(this.productId);
    this.createQuantityForm();
  }

  createQuantityForm() {
    this.quantityForm = this.fb.group({
      quantity: [1, Validators.required]
    });
  }

  getProduct(productId) {
    this.productService.getProductWithId(productId).subscribe(val => {
      this.product = val;
      this.imgUrls = this.getImageUrls(val.images);
      console.log(val);
    });
  }

  getImageUrls(imgs) {
    let urls = [];
    imgs.forEach(i => {
      urls.push(this.imageService.getProductImageUrl(i.id));
    });

    return urls;
  }

  addToCart() {
    this.cartService.getUsersCart(this.authenticationService.currentUserValue.user.id).subscribe(val => {
      this.cartService.addItemToCart(val.id, this.productId, this.quantity.value).subscribe(item => {
        if (item.id) {
          this.navigationProductService.sendRefresh(item.id);
          this.notificationSerivce.showSuccessNotification('Proizvod je dodan u košaricu!', '');
        }
      });
    });
  }

  buyProduct() {
    this.cartService.getUsersCart(this.authenticationService.currentUserValue.user.id).subscribe(val => {
      this.cartService.addItemToCart(val.id, this.productId, this.quantity.value).subscribe(item => {
        if (item.id) {
          this.navigationProductService.sendRefresh(item.id);
          this.router.navigate(['/cart-summary/' + val.id]);
        }
      });
    });
  }

  checkQuantity() {
    if (this.quantity.value > this.product.quantity) {
      return true;
    } else {
      return false;
    }
  }

  get quantity() {
    return this.quantityForm.get('quantity');
  }

}
