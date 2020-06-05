import { Component, OnInit } from "@angular/core";
import { CategoryService } from "src/app/services/category.service";

@Component({
  selector: "app-all-categories",
  templateUrl: "./all-categories.component.html",
  styleUrls: ["./all-categories.component.scss"],
})
export class AllCategoriesComponent implements OnInit {
  categories;
  categoryMap = new Map<string, string[]>();

  constructor(private categoryService: CategoryService) { }

  ngOnInit(): void {
    this.getCategories();
  }

  getCategories() {
    this.categoryService.getAllCategories().subscribe((val) => {
      this.categories = val;
      this.categories.forEach((cat) => {
        const key = cat.name.charAt(0).toUpperCase();
        if (this.categoryMap.get(key)) {
          let array = this.categoryMap.get(key);
          array.push(cat);
          this.categoryMap.set(key, array);
        } else {
          this.categoryMap.set(key, [cat]);
        }
      });
      this.categoryMap = new Map([...this.categoryMap.entries()].sort());
    });
  }
}
