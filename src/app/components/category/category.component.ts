import { Component, OnInit, ViewChild } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import { CategoryGroupService } from 'src/app/services/category-group.service';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog } from '@angular/material';
import { faTrash, faEdit, faPlus } from '@fortawesome/free-solid-svg-icons';
import { NotificationService } from 'src/app/services/notification.service';
import { CategoryGroupFormComponent } from '../modals/category-group-form/category-group-form.component';
import { CategoryFormComponent } from '../modals/category-form/category-form.component';

export interface CategoryGroup {
  id: string;
  name: string;
  group_name: string;
}

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  faTrash = faTrash;
  faEdit = faEdit;
  faPlusSquare = faPlus;

  categories: MatTableDataSource<CategoryComponent>;

  displayedColumns: string[] = ['id', 'name', 'group_name', 'edit', 'delete'];

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    private categoryService: CategoryService,
    private dialog: MatDialog,
    private notificationService: NotificationService
  ) { }

  ngOnInit(): void {
    this.getAllCategories();
  }

  getAllCategories() {
    this.categoryService.getAllCategories().subscribe(val => {
      this.categories = new MatTableDataSource(val);
      this.categories.paginator = this.paginator;
      this.categories.sort = this.sort;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.categories.filter = filterValue.trim().toLowerCase();

    if (this.categories.paginator) {
      this.categories.paginator.firstPage();
    }
  }

  openNewCategoryModal() {
    const dialogRef = this.dialog.open(CategoryFormComponent, {
      width: '1000px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.categoryService.newCategory(result).subscribe(val => {
          if (val.id) {
            this.getAllCategories();
            this.notificationService.showSuccessNotification("Uspjeh!", "Uspješno ste dodali novu kategoriju!");
          }
        });
      }
    });
  }

  openEditCategoryModal(data) {
    const dialogRef = this.dialog.open(CategoryFormComponent, {
      width: '1000px',
      data
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.categoryService.editCategory(data.id, result).subscribe(val => {
          if (val.id) {
            this.getAllCategories();
            this.notificationService.showSuccessNotification("Uspjeh!", "Uspješno ste uredili kategoriju!");
          }
        });
      }
    });
  }

  deleteCategory(categoryId) {
    this.categoryService.deleteCateogry(categoryId).subscribe(val => {
      if (val.id) {
        this.getAllCategories();
        this.notificationService.showSuccessNotification("Uspjeh!", "Uspješno ste obrisali kategoriju!");
      }
    });
  }

}
