import { Component, OnInit, Input } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-product-list-view',
  templateUrl: './product-list-view.component.html',
  styleUrls: ['./product-list-view.component.scss']
})
export class ProductListViewComponent implements OnInit {

  @Input() products;

  constructor(
    private authenticationService: AuthenticationService,
  ) { }

  ngOnInit() {
  }

  isRestockable() {
    if (this.authenticationService.currentUserValue.user.role_id == 3 && this.getNumberOfActiveProducts() != 0) {
      return false;
    } else {
      return true;
    }
  }

  getNumberOfActiveProducts() {
    if (this.products.length == 0) {
      return 0;
    } else {
      let active = 0;
      this.products.forEach(product => {
        if (product.quantity > 0) {
          active++;
        }
      });

      return active;
    }
  }

}
