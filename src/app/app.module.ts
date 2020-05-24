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
  MatSliderModule,
  MatNativeDateModule,
  MatMenuModule,
  MatDialogModule,
  MatSelectModule,
  MatTableModule,
  MatTooltipModule,
  MatPaginatorModule,
  MatBadgeModule,
  MatCheckboxModule,
  MatIcon,
  MatIconModule
} from "@angular/material";
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { SimpleNotificationsModule } from 'angular2-notifications';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { JwtInterceptor } from './authentication/jwtinterceptor';
import { ErrorInterceptor } from './authentication/error-interceptor';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';
import { LoaderComponent } from './components/loader/loader.component';
import { NgxUiLoaderModule, NgxUiLoaderConfig, POSITION, SPINNER, PB_DIRECTION } from 'ngx-ui-loader';
import { UsersProductsPageComponent } from './pages/users-products-page/users-products-page.component';
import { ProductListViewComponent } from './components/product-list-view/product-list-view.component';
import { ProductListItemComponent } from './components/product-list-item/product-list-item.component';
import { ProductFormComponent } from './components/modals/product-form/product-form.component';
import { AdminPageComponent } from './pages/admin-page/admin-page.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { CategoryManagerComponent } from './components/category-manager/category-manager.component';
import { PromotionRequestManagerComponent } from './components/promotion-request-manager/promotion-request-manager.component';
import { CategoryGroupComponent } from './components/category-group/category-group.component';
import { LoaderInterceptorService } from './interceptors/loader-interceptor.service';
import { CategoryGroupFormComponent } from './components/modals/category-group-form/category-group-form.component';
import { CategoryComponent } from './components/category/category.component';
import { CategoryFormComponent } from './components/modals/category-form/category-form.component';
import { UserFormComponent } from './components/modals/user-form/user-form.component';
import { PromotionFormComponent } from './components/modals/promotion-form/promotion-form.component';
import { ProductPageComponent } from './pages/product-page/product-page.component';
import { ImageGalleryComponent } from './components/image-gallery/image-gallery.component';
import { CartSummaryComponent } from './pages/cart-summary/cart-summary.component';
import { CartItemComponent } from './components/cart-item/cart-item.component';
import { FinishShoppingPageComponent } from './pages/finish-shopping-page/finish-shopping-page.component';
import { ShoppingHistoryPageComponent } from './pages/shopping-history-page/shopping-history-page.component';
import { TransactionItemComponent } from './components/transaction-item/transaction-item.component';
import { SellingPageComponent } from './pages/selling-page/selling-page.component';
import { OrderItemComponent } from './components/order-item/order-item.component';
import { ProductsPageComponent } from './pages/products-page/products-page.component';
import { ShopItemComponent } from './components/shop-item/shop-item.component';
import { RestockProductFormComponent } from './components/modals/restock-product-form/restock-product-form.component';
import { CommentsComponent } from './components/comments/comments.component';
import { CommentItemComponent } from './components/comments/comment-item/comment-item.component';

const matFormModules = [
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  MatRippleModule,
  ReactiveFormsModule,
  MatSliderModule,
  MatMenuModule,
  MatDialogModule,
  MatSelectModule,
  MatTableModule,
  MatTooltipModule,
  MatPaginatorModule,
  MatBadgeModule,
  MatCheckboxModule,
  MatIconModule
];

const ngxUiLoaderConfig: NgxUiLoaderConfig = {
  fgsColor: '66fcf1',
  pbColor: '66fcf1',
  fgsType: SPINNER.foldingCube,
  pbDirection: PB_DIRECTION.leftToRight,
  pbThickness: 5
};


@NgModule({
  declarations: [
    AppComponent,
    NavigationBarComponent,
    HomePageComponent,
    FooterComponent,
    AuthenticationPageComponent,
    DashboardComponent,
    ProfilePageComponent,
    LoaderComponent,
    UsersProductsPageComponent,
    ProductListViewComponent,
    ProductListItemComponent,
    ProductFormComponent,
    AdminPageComponent,
    UserListComponent,
    CategoryManagerComponent,
    PromotionRequestManagerComponent,
    CategoryGroupComponent,
    CategoryGroupFormComponent,
    CategoryComponent,
    CategoryFormComponent,
    UserFormComponent,
    PromotionFormComponent,
    ProductPageComponent,
    ImageGalleryComponent,
    CartSummaryComponent,
    CartItemComponent,
    FinishShoppingPageComponent,
    ShoppingHistoryPageComponent,
    TransactionItemComponent,
    SellingPageComponent,
    OrderItemComponent,
    ProductsPageComponent,
    ShopItemComponent,
    RestockProductFormComponent,
    CommentsComponent,
    CommentItemComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    matFormModules,
    FormsModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    BrowserAnimationsModule,
    HttpClientModule,
    SimpleNotificationsModule.forRoot(),
    NgxUiLoaderModule.forRoot(ngxUiLoaderConfig),
  ],
  exports: [matFormModules],
  entryComponents: [ProductFormComponent],
  providers: [
    MatDatepickerModule,
    NavigationBarComponent,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptorService, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
