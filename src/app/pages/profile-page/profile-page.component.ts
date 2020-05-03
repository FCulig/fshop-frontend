import { Component, OnInit, Input } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { RoleService } from 'src/app/services/role.service';
import { faBirthdayCake, faUserTag, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { AuthenticationService } from 'src/app/services/authentication.service';

import * as Endpoints from './../../services/endpoints.json';
import { NotificationService } from 'src/app/services/notification.service';
import { MatDialog } from '@angular/material';
import { UserFormComponent } from 'src/app/components/modals/user-form/user-form.component';
import { PromotionFormComponent } from 'src/app/components/modals/promotion-form/promotion-form.component';
import { PromotionRequestsService } from 'src/app/services/promotion-requests.service';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent implements OnInit {
  faBirthdayCake = faBirthdayCake;
  faUserTag = faUserTag;
  faEnvelope = faEnvelope;

  private _role;

  userId;
  user;
  isUpgradeable = true; //TODO: false ako je vec poslan
  isUsersProfile = false;
  profilePictureUrl = 'http://localhost:8000/api/profilePicture/default.png';

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private authenticationService: AuthenticationService,
    private dialog: MatDialog,
    private notificationService: NotificationService,
    private roleService: RoleService,
    private promotionRequestService: PromotionRequestsService
  ) { }

  ngOnInit() {
    this.userId = this.route.snapshot.paramMap.get('id');
    if (this.userId == this.authenticationService.currentUserValue.user.id) {
      this.isUsersProfile = true;
    }
    this.getUser();
  }

  getUser() {
    this.userService.getUserWithId(this.userId).subscribe(val => {
      this.user = val;
      this.profilePictureUrl = Endpoints.BASE_URL + Endpoints.PROFILE_PICTURE + val.profile_img_url;
      console.log(val);
      this.getRole(this.user.role_id);
    });
  }

  editUser() {
    const dialogRef = this.dialog.open(UserFormComponent, {
      width: '1000px',
      data: this.user
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.userService.editUser(this.userId, result).subscribe(val => {
          if (val.id) {
            this.getUser();
            this.notificationService.showSuccessNotification('Uspjeh!', 'Uspješno ste promijenili vaše podatke!');
          } else {
            //TODO: poruke za greške
          }
        });
      }
    });
  }

  upgradeToShop() {
    const dialogRef = this.dialog.open(PromotionFormComponent, {
      width: '1000px',
      data: this.userId
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && result.agree == true) {
        this.promotionRequestService.newPromotionRequest(this.userId).subscribe(val => {
          if (val.id) {
            this.notificationService.showSuccessNotification('Uspjeh!', 'Uspješno ste poslali zahtjev za promociju!');
          }
        });
      }
    });
  }

  private getRole(roleId) {
    this.roleService.getRoleWithId(roleId).subscribe(val => {
      this._role = val;
    });
  }

  get role() {
    if (this._role) {
      return this._role.name.charAt(0) + this._role.name.slice(1).toLowerCase();
    }
  }
}
