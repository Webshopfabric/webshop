import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProductsComponent } from './products/products.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { AboutComponent } from './about/about.component';
import { CategoryComponent } from './category/category.component';
import { ContactComponent } from './contact/contact.component';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { AnimalGalleryComponent } from './animal-gallery/animal-gallery.component';
import { CartComponent } from './cart/cart.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'categories', component: CategoryComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'about', component: AboutComponent },
  { path: 'cart', component: CartComponent },
  { path: 'pets', component: AnimalGalleryComponent },
  { path: '**', redirectTo: 'home', pathMatch: 'full' }
];







@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [
    { provide: LocationStrategy, useClass: HashLocationStrategy }
  ]
})
export class AppRoutingModule { }
