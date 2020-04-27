import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { AuthenticationPageComponent } from './pages/authentication-page/authentication-page.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AuthGuard } from './authentication/auth-guard';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';
import { UsersProductsPageComponent } from './pages/users-products-page/users-products-page.component';
import { UserWithIdGuardGuard } from './authentication/user-with-id-guard.guard';


const routes: Routes = [
  { path: 'user-products/:id', component: UsersProductsPageComponent, canActivate: [UserWithIdGuardGuard] },
  { path: 'profile/:id', component: ProfilePageComponent },
  { path: 'authentication', component: AuthenticationPageComponent },
  { path: '', component: HomePageComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
