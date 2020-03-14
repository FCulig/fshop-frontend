import { Component, OnInit } from '@angular/core';
import { faShoppingCart, faUser, faMale, faFemale, faChild } from '@fortawesome/free-solid-svg-icons';

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
  
  constructor() { }

  ngOnInit() {
  }

}
