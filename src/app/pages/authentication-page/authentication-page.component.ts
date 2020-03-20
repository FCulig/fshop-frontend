import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder } from "@angular/forms";

@Component({
  selector: "app-authentication-page",
  templateUrl: "./authentication-page.component.html",
  styleUrls: ["./authentication-page.component.scss"]
})
export class AuthenticationPageComponent implements OnInit {
  registrationForm: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.registrationForm = this.fb.group({
      name: "",
      surname: "",
      email: ""
    });
  }

  register() {
    console.log("Register");
  }
}
