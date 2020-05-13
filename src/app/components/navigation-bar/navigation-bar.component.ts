import { Component, OnInit, Input } from '@angular/core';
import { faShoppingCart, faUser, faMale, faFemale, faChild, faTimes } from '@fortawesome/free-solid-svg-icons';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/services/notification.service';
import { CartService } from 'src/app/services/cart.service';
import { ImageService } from 'src/app/services/image.service';
import { NavigationProductService } from 'src/app/services/navigation-product.service';

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

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
    private notificationService: NotificationService,
    private cartService: CartService,
    private imageService: ImageService,
    private navigationProductService: NavigationProductService
  ) { }

  ngOnInit() {
    this.subscribeAuthenticationEvents();
    this.getCart();
    this.navigationProductService.refresh$.subscribe(val => {
      this.getCart();
    });
  }

  logout() {
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
        console.log(this.userId);
        this.getCart();
      } else {
        this.isLoggedIn = false;
        this.username = null;
        this.userId = null;
      }
    });
  }

  getCart() {
    this.cartService.getUsersCart(this.authenticationService.currentUserValue.user.id).subscribe(val => {
      this.cart = val;
    });
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
