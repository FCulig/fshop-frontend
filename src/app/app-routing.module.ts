import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { AuthenticationPageComponent } from './pages/authentication-page/authentication-page.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AuthGuard } from './authentication/auth-guard';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';


const routes: Routes = [
  { path: 'profile/:id', component: ProfilePageComponent },
  { path: 'authentication', component: AuthenticationPageComponent },
  { path: '', component: HomePageComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: '**',  redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
