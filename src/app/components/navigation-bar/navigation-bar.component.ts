import { Component, OnInit, Input } from '@angular/core';
import { faShoppingCart, faUser, faMale, faFemale, faChild } from '@fortawesome/free-solid-svg-icons';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Router } from '@angular/router';
import { NotificationsService } from 'angular2-notifications';

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

  isLoggedIn: boolean;
  username: string;
  userId: number;

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
    private notificationService: NotificationsService) { }

  ngOnInit() {
    this.subscribeAuthenticationEvents();
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/']);
    this.showSuccessfullLogoutNotification();
  }

  private showSuccessfullLogoutNotification() {
    this.notificationService.success('Uspješno ste se odjavili!', '', {
      timeOut: 3000,
      showProgressBar: false,
      pauseOnHover: true,
      clickToClose: true,
      clickIconToClose: true
    });
  }

  private subscribeAuthenticationEvents() {
    this.authenticationService.currentUser.subscribe(val => {
      if (val && val.user && val.user.username) {
        this.isLoggedIn = true;
        this.username = val.user.username;
        this.userId = val.user.id;
      } else {
        this.isLoggedIn = false;
        this.username = null;
        this.userId = null;
      }
    });
  }

}
