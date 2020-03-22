import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { NavigationBarComponent } from "./components/navigation-bar/navigation-bar.component";
import { HomePageComponent } from "./pages/home-page/home-page.component";
import { FooterComponent } from "./components/footer/footer.component";
import { AuthenticationPageComponent } from "./pages/authentication-page/authentication-page.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import {
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  MatRippleModule,
  MatSlider,
  MatSliderModule,
  MatNativeDateModule
} from "@angular/material";
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';

const matFormModules = [
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  MatRippleModule,
  ReactiveFormsModule,
  MatSliderModule
];
@NgModule({
  declarations: [
    AppComponent,
    NavigationBarComponent,
    HomePageComponent,
    FooterComponent,
    AuthenticationPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    BrowserAnimationsModule,
    matFormModules,
    FormsModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  exports: [matFormModules],
  providers: [MatDatepickerModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
