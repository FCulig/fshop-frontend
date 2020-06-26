import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import { CategoryGroupService } from 'src/app/services/category-group.service';
import { ProductsService } from 'src/app/services/products.service';
import { FormBuilder, Validators } from '@angular/forms';
import { NotificationService } from 'src/app/services/notification.service';
import { Router, ActivatedRoute } from '@angular/router';
import { query, group } from '@angular/animations';

@Component({
  selector: 'app-products-page',
  templateUrl: './products-page.component.html',
  styleUrls: ['./products-page.component.scss']
})
export class ProductsPageComponent implements OnInit {

  products;
  categoryGroups;

  filterForm;

  filters = new Map<string, any>();
  parameters = new Map<string, any>();

  constructor(
    private categoryGroupService: CategoryGroupService,
    private productService: ProductsService,
    private fb: FormBuilder,
    private notificationService: NotificationService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.createFilterForm();
    this.getQueryParameters();
  }

  createFilterForm() {
    this.filterForm = this.fb.group({
      category: null,
      minPrice: null,
      maxPrice: null
    });
  }

  getQueryParameters() {
    this.route.queryParams.subscribe(params => {
      for (var key in params) {
        if (params.hasOwnProperty(key)) {
          this.parameters.set(key, params[key]);
        }
      }

      this.getAllCategoires();
    });
  }

  getAllCategoires() {
    this.categoryGroupService.getAllCategoryGroups().subscribe(val => {
      this.categoryGroups = val;
      this.getProducts();
    });
  }

  getProducts() {
    if (this.isFormValid()) {
      this.productService.getFilteredProducts(this.getFilters()).subscribe(val => {
        this.products = val;
      });
    }
  }

  filterProducts() {
    this.router.navigate(['/products'], { queryParams: this.getQueryParams() });
  }

  getQueryParams() {
    let params = {};

    if (this.category != null) {
      this.filters.set('category', this.category.name);
      params['category'] = this.category.name;
    }

    if (this.minPrice != null) {
      this.filters.set('minPrice', 'Od: ' + this.minPrice + 'kn');
      params['minPrice'] = this.minPrice;
    }

    if (this.maxPrice != null) {
      this.filters.set('maxPrice', 'Do: ' + this.maxPrice + 'kn');
      params['maxPrice'] = this.maxPrice;
    }

    return params;
  }

  private isFormValid() {
    let valid = true;

    if (this.maxPrice && this.minPrice && this.maxPrice < this.minPrice) {
      valid = false;
      this.notificationService.showErrorNotification('Minimalna cijena ne može biti veća od maksimalne', '');
    }

    return valid;
  }

  private getFilters() {
    let filterString = '?';

    if (this.parameters.get('category')) {
      console.log(this.parameters.get('category'));
      this.filters.set('category', this.parameters.get('category'));
      filterString = filterString + '&category=' + this.getCategoryID(this.parameters.get('category'));
    }

    if (this.parameters.get('minPrice')) {
      this.filters.set('minPrice', 'Od: ' + this.parameters.get('minPrice') + 'kn');
      filterString = filterString + '&min-price=' + this.parameters.get('minPrice');
    }

    if (this.parameters.get('maxPrice')) {
      this.filters.set('maxPrice', 'Do: ' + this.parameters.get('maxPrice') + 'kn');
      filterString = filterString + '&max-price=' + this.parameters.get('maxPrice');
    }

    return filterString;
  }

  private getCategoryID(categoryName) {
    let cat;
    this.categoryGroups.forEach(group => {
      group.categories.forEach(category => {
        if (category.name == categoryName) {
          cat = category.id;
        }
      });
    });

    return cat;
  }

  removeFilter(key) {
    this.filterForm.get(key).reset();
    this.filters.delete(key);
    this.parameters.delete(key);
    this.filterProducts();
  }

  removeAllFilters() {
    this.filterForm.reset();
    this.filters.forEach((val, key) => {
      this.filters.delete(key);
    });
    this.parameters.forEach((val, key) => {
      this.parameters.delete(key);
    });
    this.filterProducts();
  }

  get category() {
    return this.filterForm.get('category').value;
  }

  get minPrice() {
    return this.filterForm.get('minPrice').value;
  }

  get maxPrice() {
    return this.filterForm.get('maxPrice').value;
  }

  resetMaxPrice() {
    this.filterForm.get('maxPrice').reset();
  }

  resetMinPrice() {
    this.filterForm.get('minPrice').reset();
  }

}
