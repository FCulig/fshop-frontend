import { Component, OnInit, Input } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { RoleService } from 'src/app/services/role.service';
import { faBirthdayCake, faUserTag, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';

import * as Endpoints from './../../services/endpoints.json';

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
  isUsersProfile = false;
  profilePictureUrl = 'http://localhost:8000/api/profilePicture/default.png';

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private authenticationService: AuthenticationService,
    private roleService: RoleService,
    private ngxService: NgxUiLoaderService) { }

  ngOnInit() {
    this.ngxService.start();
    this.userId = this.route.snapshot.paramMap.get('id');
    if (this.userId == this.authenticationService.currentUserValue.user.id) {
      this.isUsersProfile = true;
    }
    this.userService.getUserWithId(this.userId).subscribe(val => {
      this.user = val;
      this.profilePictureUrl = Endpoints.BASE_URL + Endpoints.PROFILE_PICTURE + val.profile_img_url;
      console.log(val);
      this.getRole(this.user.role_id);
    });
  }

  private getRole(roleId) {
    this.roleService.getRoleWithId(roleId).subscribe(val => {
      this._role = val;
      this.ngxService.stop();
    });
  }

  get role() {
    if(this._role){
      return this._role.name.charAt(0) + this._role.name.slice(1).toLowerCase();
    }
  }
}
