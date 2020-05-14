import { Component, OnInit, Input } from '@angular/core';
import { faShoppingCart, faUser, faMale, faFemale, faChild, faTimes } from '@fortawesome/free-solid-svg-icons';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/services/notification.service';
import { CartService } from 'src/app/services/cart.service';
import { ImageService } from 'src/app/services/image.service';
import { NavigationProductService } from 'src/app/services/navigation-product.service';
import { TransactionService } from 'src/app/services/transaction.service';
import { NavigationLogoutService } from 'src/app/services/navigation-logout.service';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.scss']
})
export class NavigationBarComponent implements OnInit {

  faShoppingCart = faShoppingCart;
  faUser = faUser;
  faMale = faMale;
  faFemale = faFemale;
  faChild = faChild;
  faTimes = faTimes;

  isLoggedIn: boolean;
  username: string;
  userId: number;
  cart;
  numberPendingOrders;
  roleId;

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
    private notificationService: NotificationService,
    private cartService: CartService,
    private imageService: ImageService,
    private navigationProductService: NavigationProductService,
    private navigationLogoutService: NavigationLogoutService,
    private transactionService: TransactionService
  ) { }

  ngOnInit() {
    this.subscribeAuthenticationEvents();
    this.getCart();
    this.navigationProductService.refresh$.subscribe(val => {
      this.getCart();
    });
    this.navigationLogoutService.logout$.subscribe(val => {
      this.logout();
    });
    this.getOrders();
  }

  getOrders() {
    if (this.isLoggedIn) {
      this.transactionService.getUsersOrdersWithStatus(1, this.userId).subscribe(val => {
        this.numberPendingOrders = val.length;
      });
    }
  }

  logout() {
    this.numberPendingOrders = null;
    this.cart = null;
    this.roleId = null;
    this.authenticationService.logout();
    this.router.navigate(['/']);
    this.notificationService.showSuccessNotification('Uspješno ste se odjavili!', '');
  }

  private subscribeAuthenticationEvents() {
    this.authenticationService.currentUser.subscribe(val => {
      if (val && val.user && val.user.username) {
        this.isLoggedIn = true;
        this.username = val.user.username;
        this.userId = val.user.id;
        this.roleId = val.user.role_id;
        this.getCart();
      } else {
        this.roleId = null;
        this.isLoggedIn = false;
        this.username = null;
        this.userId = null;
      }
    });
  }

  getCart() {
    if (this.isLoggedIn) {
      this.cartService.getUsersCart(this.authenticationService.currentUserValue.user.id).subscribe(val => {
        this.cart = val;
      });
    }
  }

  removeFromCart(itemId) {
    this.cartService.removeItemFromCart(itemId).subscribe(val => {
      if (val.id) {
        this.getCart();
        this.notificationService.showSuccessNotification('Proizvod je maknut iz košarice.', '');
      }
    });
  }

  getProductImage(url) {
    return this.imageService.getProductImageUrl(url);
  }

  getTotalPrice() {
    let price = Number(0.0);

    this.cart.items.forEach(item => {
      price = price + Number(item.price);
    });

    return price;
  }

}
