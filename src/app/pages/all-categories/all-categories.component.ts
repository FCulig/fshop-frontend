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

  constructor(private categoryService: CategoryService) {}

  ngOnInit(): void {
    this.getCategories();
  }

  getCategories() {
    this.categoryService.getAllCategories().subscribe((val) => {
      this.categories = val;
      console.log(val);
      this.categories.forEach((cat) => {
        const key = cat.name.charAt(0).toUpperCase();
        if (this.categoryMap.get(key)) {
          this.categoryMap.set(key, (this.categoryMap.get(key)).push(cat));
        } else {
          this.categoryMap.set(key, [cat]);
        }
      });
      console.log(this.categoryMap)
    });
  }
}
