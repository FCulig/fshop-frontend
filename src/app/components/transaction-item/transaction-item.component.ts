import { Component, OnInit, Input, Output } from '@angular/core';
import { ImageService } from 'src/app/services/image.service';
import { TransactionService } from 'src/app/services/transaction.service';
import { NotificationService } from 'src/app/services/notification.service';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-transaction-item',
  templateUrl: './transaction-item.component.html',
  styleUrls: ['./transaction-item.component.scss']
})
export class TransactionItemComponent implements OnInit {
  private _transaction;

  @Output() refreshTransactions = new EventEmitter();
  @Input() set transaction(transaction) {
    this._transaction = transaction;
    if (transaction.coupon && transaction.product.price) {
      this.discountedPrice = transaction.product.price - (transaction.product.price * transaction.coupon.ammount / 100);
    }
  }

  get transaction() {
    return this._transaction;
  }

  discountedPrice;

  constructor(
    private imageService: ImageService,
    private transactionService: TransactionService,
    private notificationService: NotificationService
  ) { }

  ngOnInit(): void {
    console.log(this.transaction);
  }

  getProductImg() {
    return this.imageService.getProductImageUrl(this.transaction.product.images[0].id);
  }

  cancel() {
    this.transactionService.cancelTransaction(this.transaction.id).subscribe(val => {
      if (val.id) {
        this.refreshTransactions.emit('');
        this.notificationService.showSuccessNotification('Narudžba je uspješno otkazana!', '');
      }
    });
  }
}
