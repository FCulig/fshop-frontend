import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { faUpload } from '@fortawesome/free-solid-svg-icons';
import { UserService } from 'src/app/services/user.service';
import { NotificationsService } from 'angular2-notifications';
import { User } from 'src/app/entities/user';
import { formatDate } from '@angular/common';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ActivatedRoute, Router } from '@angular/router';

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

  constructor(
    private userService: UserService,
    private fb: FormBuilder,
    private notificationService: NotificationsService,
    private authenticationService: AuthenticationService,
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

  //TODO: dodaj za upload za sliku
  private createRegisterForm() {
    this.registrationForm = this.fb.group({
      first_name: [null, Validators.required],
      last_name: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      birth_date: [null, Validators.required],
      username: [null, Validators.required],
      password: [null, Validators.required],
      c_password: [null, Validators.required],
    });
  }

  private showErrorNotification(message: string) {
    this.notificationService.error('Pogreška', message, {
      timeOut: 8000,
      showProgressBar: false,
      pauseOnHover: true,
      clickToClose: true,
      clickIconToClose: true
    });
  }

  private showSuccessNotification() {
    this.notificationService.success('Uspješna registracija!', '', {
      timeOut: 8000,
      showProgressBar: false,
      pauseOnHover: true,
      clickToClose: true,
      clickIconToClose: true
    });
  }

  register() {
    if (this.confirmedPasswordCheck()) {
      this.registrationForm.value.birth_date = formatDate(this.registrationForm.value.birth_date, 'yyyy-MM-dd', 'en');
      this.userService.registerUser(this.registrationForm.value).subscribe(val => {
        if (val.duplicateEmail) {
          this.showErrorNotification('Već postoji korisnik s ovom email adresom!');
        } else if (val.duplicateUsername) {
          this.showErrorNotification('Već postoji korisnik s ovom korisničkim imenom!');
        } else {
          this.showSuccessNotification();
          this.router.navigate(['/authentication']);
        }
      });
    }
  }

  login() {
    this.authenticationService.login(this.loginForm.value.email, this.loginForm.value.password).subscribe(val => {
      if (val.message) {
        this.showErrorNotification('Email ili lozinka nisu točni!');
      } else {
        this.router.navigate(['/']);
      }
    });
  }

  switchForm() {
    this.isRegister = !this.isRegister;
  }

  private confirmedPasswordCheck() {
    if (this.registerConfirmedPassword.value !== this.registerPassword.value) {
      this.showErrorNotification('Lozinke se ne podudaraju!');
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

  get registerUsername(){
    return this.registrationForm.get('username');
  }

  get registerPassword() {
    return this.registrationForm.get('password');
  }

  get registerConfirmedPassword() {
    return this.registrationForm.get('c_password');
  }

}
