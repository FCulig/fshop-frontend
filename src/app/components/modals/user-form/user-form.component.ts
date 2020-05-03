import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, Validators } from '@angular/forms';
import { faUpload } from '@fortawesome/free-solid-svg-icons';
import * as Endpoints from './../../../services/endpoints.json';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {
  faUpload = faUpload;

  userForm;
  imagePath;
  selectedFile: File;
  profilePictureUrl;

  constructor(
    public dialogRef: MatDialogRef<UserFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private fb: FormBuilder,
  ) { }

  ngOnInit() {
    this.profilePictureUrl = Endpoints.BASE_URL + Endpoints.PROFILE_PICTURE + this.data.profile_img_url;
    this.userForm = this.fb.group({
      first_name: [this.data?.first_name, Validators.required],
      last_name: [this.data?.last_name, Validators.required],
      username: [this.data?.username, Validators.required],
      email: [this.data?.email, Validators.required],
      birth_date: [this.data?.birth_date, Validators.required],
      profile_picture: []
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

}
