import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, Validators } from '@angular/forms';
import { faUpload } from '@fortawesome/free-solid-svg-icons';
import * as Endpoints from './../../../services/endpoints.json';
import { UserService } from 'src/app/services/user.service';
import { NotificationService } from 'src/app/services/notification.service';
import { NavigationLogoutService } from 'src/app/services/navigation-logout.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {
  faUpload = faUpload;

  userForm;
  changePasswordForm;
  imagePath;
  selectedFile: File;
  profilePictureUrl;

  constructor(
    public dialogRef: MatDialogRef<UserFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private fb: FormBuilder,
    private userService: UserService,
    private notificationService: NotificationService,
    private navigationLogoutService: NavigationLogoutService
  ) { }

  ngOnInit() {
    this.profilePictureUrl = Endpoints.BASE_URL + Endpoints.PROFILE_PICTURE + this.data.profile_img_url;
    this.createUserForm();
    this.createChangePasswordForm();
  }

  createUserForm() {
    this.userForm = this.fb.group({
      first_name: [this.data?.first_name, Validators.required],
      last_name: [this.data?.last_name, Validators.required],
      username: [this.data?.username, Validators.required],
      email: [this.data?.email, Validators.required],
      birth_date: [this.data?.birth_date, Validators.required],
      profile_picture: []
    });
  }

  createChangePasswordForm() {
    this.changePasswordForm = this.fb.group({
      password: [null, Validators.required],
      c_password: [null, Validators.required],
      old_password: [null, Validators.required],
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  cancel() {
    this.dialogRef.close();
  }

  submit() {
    let formData = new FormData();

    if (this.selectedFile) {
      formData.append('profile_picture', this.selectedFile, this.selectedFile['name']);
    }

    for (var key in this.userForm.value) {
      if (this.userForm.value.hasOwnProperty(key) && key != 'profile_picture') {
        formData.append(key, this.userForm.value[key]);
      }
    }

    this.dialogRef.close(formData);
  }

  onFileChanged(event) {
    this.selectedFile = event.target.files[0];

    let reader = new FileReader();
    reader.readAsDataURL(this.selectedFile);
    reader.onload = (_event) => {
      this.imagePath = reader.result;
    }
  }

  changePassword() {
    console.log(this.changePasswordForm.value);
    if (this.password.value == this.c_password.value) {
      this.userService.changeUsersPassword(this.data.id, this.changePasswordForm.value).subscribe(val => {
        if (val.id) {
          this.navigationLogoutService.sendLogout(val);
          this.notificationService.showSuccessNotification('Lozinka uspješno promijenjena!', 'Zbog sigurnosnih razloga morate se ponvo prijaviti.');
          this.cancel();
        }
      });
    } else {
      this.notificationService.showErrorNotification('Lozinke se ne podudaraju!', '');
    }
  }

  get firstName() {
    return this.userForm.get('first_name');
  }

  get lastName() {
    return this.userForm.get('last_name');
  }

  get email() {
    return this.userForm.get('email');
  }

  get dateOfBirth() {
    return this.userForm.get('birth_date');
  }

  get username() {
    return this.userForm.get('username');
  }

  get password() {
    return this.changePasswordForm.get('password');
  }

  get c_password() {
    return this.changePasswordForm.get('c_password');
  }

  get old_password() {
    return this.changePasswordForm.get('old_password');
  }
}
