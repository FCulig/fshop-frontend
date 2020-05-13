import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';
import { CartService } from '../services/cart.service';

@Injectable({
  providedIn: 'root'
})
export class CartSummaryGuard implements CanActivate {
  isChecking = false;
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private cartService: CartService
  ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (!this.isChecking) {
      if (this.authenticationService.currentUserValue) {
        console.log(this.authenticationService.currentUserValue.user.id);
        this.isChecking = true;
        this.cartService.getUsersCart(this.authenticationService.currentUserValue.user.id).subscribe(val => {
          console.log(val.user_id);
          if (val.user_id == this.authenticationService.currentUserValue.user.id) {
            this.router.navigate(['/cart-summary/' + val.id]);
          }
        });
      }

      this.router.navigate(['/']);
      return false;
    }
  }

}
