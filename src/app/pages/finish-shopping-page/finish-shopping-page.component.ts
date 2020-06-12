import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { CartService } from 'src/app/services/cart.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TransactionService } from 'src/app/services/transaction.service';
import { NavigationBarComponent } from 'src/app/components/navigation-bar/navigation-bar.component';
import { NavigationProductService } from 'src/app/services/navigation-product.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-finish-shopping-page',
  templateUrl: './finish-shopping-page.component.html',
  styleUrls: ['./finish-shopping-page.component.scss']
})
export class FinishShoppingPageComponent implements OnInit {

  transactionForm: FormGroup;
  nItems;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private authenticationService: AuthenticationService,
    private cartService: CartService,
    private transactionService: TransactionService,
    private navigationbarRefresh: NavigationProductService,
    private notificationService: NotificationService
  ) { }

  ngOnInit(): void {
    this.checkIfUsersCart();
    this.createTransactionFrom();
  }

  checkIfUsersCart() {
    this.cartService.getUsersCart(this.authenticationService.currentUserValue.user.id).subscribe(val => {
      if (val) {
        this.nItems = val.items.length;
      }

      if (val?.id != this.route.snapshot.paramMap.get('id')) {
        this.router.navigate(['/finish-summary/' + val.id]);
      }
    });
  }

  createTransactionFrom() {
    this.transactionForm = this.fb.group({
      country: ['', Validators.required],
      city: ['', Validators.required],
      zip_code: ['', Validators.required],
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      address: ['', Validators.required],
      user_id: [this.authenticationService.currentUserValue.user.id, Validators.required],
      coupon_id: [localStorage.getItem("coupon")]
    });
    localStorage.setItem("coupon", "");
  }

  submit() {
    console.log(this.transactionForm.value);
    this.transactionService.newTransaction(this.transactionForm.value).subscribe(val => {
      console.log(val);
      if (val.length == this.nItems) {
        this.notificationService.showSuccessNotification('Narudžba je uspješna', '');
        this.navigationbarRefresh.sendRefresh('refresh');
        this.router.navigate(['/']);
      } else {
        this.router.navigate(['/cart-summary/' + this.route.snapshot.paramMap.get('id')]);
        this.notificationService.showErrorNotification('Greška!', 'Tokom transakcije je došlo do pogreške, pokušajte ponovo ili kontaktirajte administratora!')
      }
    });
  }

  get first_name() {
    return this.transactionForm.get('first_name');
  }

  get last_name() {
    return this.transactionForm.get('last_name');
  }

  get city() {
    return this.transactionForm.get('city');
  }

  get country() {
    return this.transactionForm.get('country');
  }


  get address() {
    return this.transactionForm.get('address');
  }


  get zip_code() {
    return this.transactionForm.get('zip_code');
  }

}
