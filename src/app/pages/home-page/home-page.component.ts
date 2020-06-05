import { Component, OnInit } from "@angular/core";
import { ProductsService } from "src/app/services/products.service";

@Component({
  selector: "app-home-page",
  templateUrl: "./home-page.component.html",
  styleUrls: ["./home-page.component.scss"],
})
export class HomePageComponent implements OnInit {
  products;
  keys;

  constructor(private productService: ProductsService) { }

  ngOnInit() {
    this.getProducts();
  }

  getProducts() {
    this.productService.getHomePageProducts().subscribe((val) => {
      this.products = val;
      console.log(val);
      this.keys = Object.keys(val);
    });
  }
}
