import { Component, OnInit, Input, Output } from '@angular/core';
import { ImageService } from 'src/app/services/image.service';
import { TransactionService } from 'src/app/services/transaction.service';
import { NotificationService } from 'src/app/services/notification.service';
import { EventEmitter } from '@angular/core';
import { NavigationBarRefreshOrdersService } from 'src/app/services/navigation-bar-refresh-orders.service';

@Component({
  selector: 'app-order-item',
  templateUrl: './order-item.component.html',
  styleUrls: ['./order-item.component.scss']
})
export class OrderItemComponent implements OnInit {
  private _order;

  @Output() refreshOrders = new EventEmitter();
  @Input()
  set order(transaction) {
    this._order = transaction;
    if (transaction.coupon && transaction.product.price) {
      this.discountedPrice = transaction.product.price - (transaction.product.price * transaction.coupon.ammount / 100);
    }
  }
  get order() {
    return this._order;
  }

  discountedPrice;

  constructor(
    private imageService: ImageService,
    private transactionService: TransactionService,
    private notificationService: NotificationService,
    private navigationBarRefreshOrders: NavigationBarRefreshOrdersService
  ) { }

  ngOnInit(): void {
    console.log(this.order);
  }

  getProductImg() {
    return this.imageService.getProductImageUrl(this.order.product.images[0].id);
  }

  send() {
    this.transactionService.shipTransaction(this.order.id).subscribe(val => {
      if (val.id) {
        this.refreshOrders.emit('');
        this.navigationBarRefreshOrders.sendRefresh(val);
        this.notificationService.showSuccessNotification('Transakcija je označena kao poslana!', '');
      }
    });
  }

}
