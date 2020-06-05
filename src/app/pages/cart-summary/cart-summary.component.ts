import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NotificationService } from 'src/app/services/notification.service';
import { CouponService } from 'src/app/services/coupon.service';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-cart-summary',
  templateUrl: './cart-summary.component.html',
  styleUrls: ['./cart-summary.component.scss']
})
export class CartSummaryComponent implements OnInit {

  cart;
  discountCoupon;
  applyCoupon;
  totalPrice;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private cartService: CartService,
    private notificationService: NotificationService,
    private couponService: CouponService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.getCart();
    this.createForm();
  }

  createForm() {
    this.applyCoupon = this.fb.group({
      coupon: [null, Validators.required]
    });
  }

  getCart() {
    this.cartService.getUsersCart(this.authenticationService.currentUserValue.user.id).subscribe(val => {
      if (val.id != this.route.snapshot.paramMap.get('id')) {
        this.router.navigate(['/cart-summary/' + val.id]);
      }

      console.log(val);
      this.cart = val;
    });
  }

  apply() {
    this.couponService.getCouponByName(this.coupon.value).subscribe(val => {
      console.log(val);
      if (val.id) {
        this.discountCoupon = val;
        this.notificationService.showSuccessNotification('Kupon za popust je uspješno primjenjen!', '');
        localStorage.setItem("coupon", val.id);
      } else {
        this.notificationService.showErrorNotification(val.message, '');
      }
    });
  }

  get coupon() {
    return this.applyCoupon.get('coupon');
  }

  getTotalPrice() {
    let price = Number(0.0);

    this.cart.items.forEach(item => {
      if (this.discountCoupon && this.discountCoupon.user.id == item.products_owner) {
        price = price + (Number(item.price) - (Number(item.price) * this.discountCoupon.ammount / 100));
      } else {
        price = price + Number(item.price);
      }

    });

    return price;
  }
}
