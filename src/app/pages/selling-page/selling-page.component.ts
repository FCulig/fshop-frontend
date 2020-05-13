import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { TransactionService } from 'src/app/services/transaction.service';

@Component({
  selector: 'app-selling-page',
  templateUrl: './selling-page.component.html',
  styleUrls: ['./selling-page.component.scss']
})
export class SellingPageComponent implements OnInit {

  orders;
  currentOption = 0;

  constructor(
    private authenticationService: AuthenticationService,
    private transactionService: TransactionService
  ) { }

  ngOnInit(): void {
    this.getOrders();
  }

  getOrders() {
    this.transactionService.getUsersOrders(this.authenticationService.currentUserValue.user.id).subscribe(val => {
      console.log(val);
      this.orders = val;
    });
  }

  getOrdersWithStatus(status) {
    this.transactionService.getUsersOrdersWithStatus(status, this.authenticationService.currentUserValue.user.id).subscribe(val => {
      this.orders = val;
    })
  }

  public onFilterChange(event): void {
    if (event.target.value !== this.currentOption) {
      this.currentOption = event.target.value;

      if (this.currentOption == 0) {
        this.getOrders();
      } else {
        this.getOrdersWithStatus(this.currentOption);
      }
    }
  }

  //TODO: Navigacija bubble kolko narudžbi ima i za cart kolko itema
}
