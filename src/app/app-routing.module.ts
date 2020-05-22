import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { AuthenticationPageComponent } from './pages/authentication-page/authentication-page.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AuthGuard } from './authentication/auth-guard';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';
import { UsersProductsPageComponent } from './pages/users-products-page/users-products-page.component';
import { UserWithIdGuardGuard } from './authentication/user-with-id-guard.guard';
import { AdminPageComponent } from './pages/admin-page/admin-page.component';
import { AdminGuard } from './authentication/admin.guard';
import { ProductPageComponent } from './pages/product-page/product-page.component';
import { CartSummaryComponent } from './pages/cart-summary/cart-summary.component';
import { FinishShoppingPageComponent } from './pages/finish-shopping-page/finish-shopping-page.component';
import { ShoppingHistoryPageComponent } from './pages/shopping-history-page/shopping-history-page.component';
import { SellingPageComponent } from './pages/selling-page/selling-page.component';
import { ProductsPageComponent } from './pages/products-page/products-page.component';


const routes: Routes = [
  { path: 'products', component: ProductsPageComponent },
  { path: 'selling/:id', component: SellingPageComponent, canActivate: [UserWithIdGuardGuard] },
  { path: 'shopping-history/:id', component: ShoppingHistoryPageComponent, canActivate: [UserWithIdGuardGuard] },
  { path: 'finish-shopping/:id', component: FinishShoppingPageComponent },
  { path: 'user-products/:id', component: UsersProductsPageComponent, canActivate: [UserWithIdGuardGuard] },
  { path: 'profile/:id', component: ProfilePageComponent },
  { path: 'cart-summary/:id', component: CartSummaryComponent, canActivate: [AuthGuard] },
  { path: 'product/:id', component: ProductPageComponent },
  { path: 'authentication', component: AuthenticationPageComponent },
  { path: 'admin', component: AdminPageComponent, canActivate: [AdminGuard] },
  { path: '', component: HomePageComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
