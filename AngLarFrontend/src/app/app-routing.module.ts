import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProductsComponent } from './products/products.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { AboutComponent } from './about/about.component';
import { CategoriesComponent } from './categories/categories.component';
import { ContactComponent } from './contact/contact.component';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { AnimalGalleryComponent } from './animal-gallery/animal-gallery.component';
import { CartComponent } from './cart/cart.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { LogoutComponent } from './logout/logout.component';
import { adminGuard} from './admin.guard';
import { authGuard } from './auth.guard';
import { guestGuard } from './guest.guard';
import { AuthService } from './auth.service';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
  // Publikus útvonalak
  { path: '', component: HomeComponent },
  { path: 'reset-password/:token', component: ResetPasswordComponent, canActivate: [guestGuard] },
  { path: 'forgot-password', component: ForgotPasswordComponent, canActivate: [guestGuard]},
  { path: 'login', component: LoginComponent, canActivate: [guestGuard] },
  { path: 'register', component: RegisterComponent, canActivate: [guestGuard] },
  { path: 'products', component: ProductsComponent },
  { path: 'categories', component: CategoriesComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'pets', component: AnimalGalleryComponent },
  { path: 'about', component: AboutComponent},
  // Bejelentkezett felhasználók útvonalai 
  { path: 'profile', component: ProfileComponent, canActivate: [authGuard] },
  { path: 'cart', component: CartComponent, canActivate: [authGuard] },
  { path: 'logout', component: LogoutComponent, canActivate: [authGuard] },
  // Admin útvonalak
  { path: 'admin-categories', component: CategoriesComponent, canActivate: [adminGuard] },
  { path: 'admin-products', component: ProductsComponent, canActivate: [adminGuard] },
  // Wildcard útvonal, ha egyik sem illeszkedik
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [
    { provide: LocationStrategy, useClass: HashLocationStrategy }
  ]
})
export class AppRoutingModule { }
