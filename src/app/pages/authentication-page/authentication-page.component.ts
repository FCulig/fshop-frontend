import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { faUpload } from '@fortawesome/free-solid-svg-icons';
import { UserService } from 'src/app/services/user.service';
import { NotificationsService } from 'angular2-notifications';
import { User } from 'src/app/entities/user';
import { formatDate } from '@angular/common';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: "app-authentication-page",
  templateUrl: "./authentication-page.component.html",
  styleUrls: ["./authentication-page.component.scss"]
})
export class AuthenticationPageComponent implements OnInit {
  registrationForm: FormGroup;
  loginForm: FormGroup;

  faUpload = faUpload;

  isRegister = false;

  selectedFile: File;

  constructor(
    private userService: UserService,
    private fb: FormBuilder,
    private authenticationService: AuthenticationService,
    private notificationService: NotificationService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.subscribeQueryParameters();
    this.createForms();
  }

  private createForms() {
    this.createRegisterForm();
    this.createLoginForm();
  }

  private subscribeQueryParameters() {
    this.route.queryParams.subscribe(params => {
      if (params.type && params.type === 'register') {
        this.isRegister = true;
      } else {
        this.isRegister = false;
      }
    });
  }

  private createLoginForm() {
    this.loginForm = this.fb.group({
      email: "",
      password: "",
    });
  }

  private createRegisterForm() {
    this.registrationForm = this.fb.group({
      first_name: [null, Validators.required],
      last_name: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      birth_date: [null, Validators.required],
      username: [null, Validators.required],
      password: [null, Validators.required],
      c_password: [null, Validators.required],
      profile_picture: []
    });
  }

  onFileChanged(event) {
    this.selectedFile = event.target.files[0];
  }

  register() {
    if (this.passwordsMatch()) {
      this.registrationForm.value.birth_date = formatDate(this.registrationForm.value.birth_date, 'yyyy-MM-dd', 'en');
      let formData = new FormData();
      formData.append('profile_picture', this.selectedFile, this.selectedFile.name)
      for (var key in this.registrationForm.value) {
        if (this.registrationForm.value.hasOwnProperty(key) && key != 'profile_picture' ) {
          formData.append(key, this.registrationForm.value[key]);
        }
      }
      this.userService.registerUser(formData).subscribe(val => {
        if (val) {
          this.notificationService.showSuccessNotification('Uspješno ste se registrirali!', '');
          this.router.navigate(['/authentication']);
        }
      });
    }
  }

  login() {
    this.authenticationService.login(this.loginForm.value.email, this.loginForm.value.password).subscribe(val => {
      if (val.message) {
        this.notificationService.showErrorNotification('Email ili lozinka nisu točni!', '');
      } else {
        this.router.navigate(['/']);
      }
    });
  }

  switchForm() {
    this.isRegister = !this.isRegister;
  }

  private passwordsMatch() {
    if (this.registerConfirmedPassword.value !== this.registerPassword.value) {
      this.notificationService.showErrorNotification('Lozinke se ne podudaraju!', '');
      return false;
    } else {
      return true;
    }
  }

  get firstName() {
    return this.registrationForm.get('first_name');
  }

  get lastName() {
    return this.registrationForm.get('last_name');
  }

  get email() {
    return this.registrationForm.get('email');
  }

  get dateOfBirth() {
    return this.registrationForm.get('birth_date');
  }

  get registerUsername() {
    return this.registrationForm.get('username');
  }

  get registerPassword() {
    return this.registrationForm.get('password');
  }

  get registerConfirmedPassword() {
    return this.registrationForm.get('c_password');
  }

}
