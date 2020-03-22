import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder } from "@angular/forms";
import { faUpload } from '@fortawesome/free-solid-svg-icons';

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

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.registrationForm = this.fb.group({
      name: "",
      surname: "",
      email: "",
      birthDate: "",
      username: "",
      password: "",
      repeatedPassword: "",
    });

    this.loginForm = this.fb.group({
      email: "",
      password: "",
    });
  }

  register() {
    console.log("Register");
  }

  login() {
    console.log("Login");
  }

  switchForm() {
    this.isRegister = !this.isRegister;
  }
}
