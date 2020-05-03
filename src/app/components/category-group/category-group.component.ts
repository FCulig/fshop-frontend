import { Component, OnInit, ViewChild } from '@angular/core';
import { CategoryGroupService } from 'src/app/services/category-group.service';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog } from '@angular/material';
import { faTrash, faEdit, faPlus } from '@fortawesome/free-solid-svg-icons';
import { NotificationService } from 'src/app/services/notification.service';
import { CategoryGroupFormComponent } from '../modals/category-group-form/category-group-form.component';

export interface CategoryGroup {
  id: string;
  name: string;
}

@Component({
  selector: 'app-category-group',
  templateUrl: './category-group.component.html',
  styleUrls: ['./category-group.component.scss']
})
export class CategoryGroupComponent implements OnInit {
  faTrash = faTrash;
  faEdit = faEdit;
  faPlusSquare = faPlus;

  categoryGroups: MatTableDataSource<CategoryGroup>;

  displayedColumns: string[] = ['id', 'name', 'edit', 'delete'];

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    private categoryGroupService: CategoryGroupService,
    private dialog: MatDialog,
    private notificationService: NotificationService) { }

  ngOnInit(): void {
    this.getAllCategoryGroups();
  }

  getAllCategoryGroups() {
    this.categoryGroupService.getAllCategoryGroups().subscribe(val => {
      this.categoryGroups = new MatTableDataSource(val);
      this.categoryGroups.paginator = this.paginator;
      this.categoryGroups.sort = this.sort;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.categoryGroups.filter = filterValue.trim().toLowerCase();

    if (this.categoryGroups.paginator) {
      this.categoryGroups.paginator.firstPage();
    }
  }

  openNewGroupModal() {
    const dialogRef = this.dialog.open(CategoryGroupFormComponent, {
      width: '1000px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.categoryGroupService.newCategoryGroup(result).subscribe(val => {
          if (val.id) {
            this.getAllCategoryGroups();
            this.notificationService.showSuccessNotification("Uspjeh!", "Uspješno ste dodali novu grupu!");
          }
        });
      }
    });
  }

  openEditGroupModal(data) {
    const dialogRef = this.dialog.open(CategoryGroupFormComponent, {
      width: '1000px',
      data
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.categoryGroupService.editCategoryGroup(data.id, result).subscribe(val => {
          if (val.id) {
            this.getAllCategoryGroups();
            this.notificationService.showSuccessNotification("Uspjeh!", "Uspješno ste preimneovali grupu!");
          }
        });
      }
    });
  }

  deleteGroup(groupId) {
    this.categoryGroupService.getCategoriesFromGroup(groupId).subscribe(val => {
      if (val.length === 0) {
        this.categoryGroupService.deleteCategoryGroup(groupId).subscribe(val => {
          if (val.id) {
            this.getAllCategoryGroups();
            this.notificationService.showSuccessNotification("Uspjeh!", "Uspješno ste obrisali grupu!");
          }
        });
      } else {
        this.notificationService.showErrorNotification("Greška!", "Ne možete obrisati grupu kojoj su pridružene kategorije!")
      }
    });
  }

}
