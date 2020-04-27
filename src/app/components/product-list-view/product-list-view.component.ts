import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-product-list-view',
  templateUrl: './product-list-view.component.html',
  styleUrls: ['./product-list-view.component.scss']
})
export class ProductListViewComponent implements OnInit {

  @Input() products;

  constructor() { }

  ngOnInit() {
  }

}
