import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-cart-summary',
  templateUrl: './cart-summary.component.html',
  styleUrls: ['./cart-summary.component.scss']
})
export class CartSummaryComponent implements OnInit {

  cart;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private cartService: CartService
  ) { }

  ngOnInit(): void {
    this.getCart();
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

  getTotalPrice() {
    let price = Number(0.0);

    this.cart.items.forEach(item => {
      price = price + Number(item.price);
    });

    return price;
  }
}
