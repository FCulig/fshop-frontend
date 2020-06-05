import { Component, OnInit, Input, Output } from '@angular/core';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { ImageService } from 'src/app/services/image.service';
import { CartService } from 'src/app/services/cart.service';
import { NotificationService } from 'src/app/services/notification.service';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.scss']
})
export class CartItemComponent implements OnInit {
  private _coupon;

  faTimes = faTimes;
  itemPrice;
  discountedPrice;

  @Output() emitRefreshCart = new EventEmitter();
  @Output() couponChange = new EventEmitter();
  @Input() item;
  @Input()
  set coupon(coupon) {
    this._coupon = coupon;
    if (coupon && this.item && this.item.products_owner == coupon.user.id) {
      this.discountedPrice = this.item.price - (this.item.price * coupon.ammount / 100);
    }
  }
  get coupon() {
    return this._coupon;
  }

  constructor(
    private imageService: ImageService,
    private cartService: CartService,
    private notificationService: NotificationService,
  ) { }

  ngOnInit(): void {
    console.log(this.item);
    this.itemPrice = this.item.price;
  }

  getProductImage(url) {
    return this.imageService.getProductImageUrl(url);
  }

  removeFromCart() {
    this.cartService.removeItemFromCart(this.item.id).subscribe(val => {
      if (val.id) {
        this.refreshCart();
        this.notificationService.showSuccessNotification('Proizvod je maknut iz košarice.', '');
      }
    });
  }

  refreshCart() {
    this.emitRefreshCart.emit('');
  }

}
