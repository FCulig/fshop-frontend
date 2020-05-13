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
  faTimes = faTimes;

  @Input() item;
  @Output() emitRefreshCart = new EventEmitter();

  constructor(
    private imageService: ImageService,
    private cartService: CartService,
    private notificationService: NotificationService,
  ) { }

  ngOnInit(): void {
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
