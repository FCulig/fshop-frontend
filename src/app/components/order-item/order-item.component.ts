import { Component, OnInit, Input, Output } from '@angular/core';
import { ImageService } from 'src/app/services/image.service';
import { TransactionService } from 'src/app/services/transaction.service';
import { NotificationService } from 'src/app/services/notification.service';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-order-item',
  templateUrl: './order-item.component.html',
  styleUrls: ['./order-item.component.scss']
})
export class OrderItemComponent implements OnInit {

  @Input() order;
  @Output() refreshOrders = new EventEmitter();

  constructor(
    private imageService: ImageService,
    private transactionService: TransactionService,
    private notificationService: NotificationService
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
        this.notificationService.showSuccessNotification('Transakcija je označena kao poslana!', '');
      }
    });
  }

}
