import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { faTrash, faAngleDoubleUp, faAngleDoubleDown } from '@fortawesome/free-solid-svg-icons';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { NotificationService } from 'src/app/services/notification.service';

export interface UserData {
  id: string;
  first_name: string;
  last_name: string;
  username: string;
  email: string;
  role_id: string;
}

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  faTrash = faTrash;
  faAngleDoubleUp = faAngleDoubleUp;
  faAngleDoubleDown = faAngleDoubleDown;

  users: MatTableDataSource<UserData>;

  displayedColumns: string[] = ['id', 'first_name', 'last_name',
    'username', 'email', 'role_id', 'promote_user', 'demote_user', 'delete_user'];

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    private userService: UserService,
    private notificationService: NotificationService) { }

  ngOnInit(): void {
    this.getUsers();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.users.filter = filterValue.trim().toLowerCase();

    if (this.users.paginator) {
      this.users.paginator.firstPage();
    }
  }

  deleteUser(userId) {
    this.userService.deleteUser(userId).subscribe(val => {
      if (val?.id) {
        this.getUsers();
        this.notificationService.showSuccessNotification('Uspjeh!', 'Uspješno ste obrisali korisnika!');
      }
    });
  }

  demoteUser(userId) {
    this.userService.demoteUser(userId).subscribe(val => {
      if (val?.id) {
        this.getUsers();
        this.notificationService.showSuccessNotification('Uspjeh!', 'Uspješno ste relegirali korisnika!');
      }
    });
  }

  promoteUser(userId) {
    this.userService.promoteUser(userId).subscribe(val => {
      if (val?.id) {
        this.getUsers();
        this.notificationService.showSuccessNotification('Uspjeh!', 'Uspješno ste promovirali korisnika!');
      }
    });
  }

  getUsers() {
    this.userService.getAllUsers().subscribe(val => {
      this.users = new MatTableDataSource(val);
      this.users.paginator = this.paginator;
      this.users.sort = this.sort;
    });
  }

  getRole(roleID) {
    switch (roleID) {
      case 1:
        return 'Administrator';
      case 2:
        return 'Trgovina';
      case 3:
        return 'Korisnik';
    }
  }
}
