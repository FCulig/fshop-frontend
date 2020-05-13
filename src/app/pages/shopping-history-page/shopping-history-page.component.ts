import { Component, OnInit } from '@angular/core';
import { TransactionService } from 'src/app/services/transaction.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { transition } from '@angular/animations';

@Component({
  selector: 'app-shopping-history-page',
  templateUrl: './shopping-history-page.component.html',
  styleUrls: ['./shopping-history-page.component.scss']
})
export class ShoppingHistoryPageComponent implements OnInit {

  transactions;
  currentOption = 0;

  constructor(
    private transactionService: TransactionService,
    private authenticationService: AuthenticationService
  ) { }

  ngOnInit(): void {
    this.getAllTransactions();
  }

  getAllTransactions() {
    this.transactionService.getUsersTransactions(this.authenticationService.currentUserValue.user.id).subscribe(val => {
      this.transactions = val;
      console.log(val);
    });
  }

  getTransactionsWithStatus(statusId) {
    this.transactionService.getUsersTransactionsWithStauts(this.authenticationService.currentUserValue.user.id, statusId).subscribe(val => {
      this.transactions = val;
      console.log(val);
    });
  }

  public onFilterChange(event): void {
    if (event.target.value !== this.currentOption) {
      this.currentOption = event.target.value;

      if (this.currentOption == 0) {
        this.getAllTransactions();
      } else {
        this.getTransactionsWithStatus(this.currentOption);
      }
    }
  }
}
