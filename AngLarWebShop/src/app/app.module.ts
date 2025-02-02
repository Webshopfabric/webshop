import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ProductService } from './product.service';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { ProductsComponent } from './products/products.component'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { AboutComponent } from './about/about.component';
import { CategoriesComponent } from './categories/categories.component';
import { FooterComponent } from './footer/footer.component';
import { ContactComponent } from './contact/contact.component';
import { AnimalGalleryComponent } from './animal-gallery/animal-gallery.component';
import { HttpClientModule } from '@angular/common/http';
import { AnimalService } from './animal.service';
import { CartComponent } from './cart/cart.component';
import { CartService } from './cart.service';
import { CurrencyPipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    RegisterComponent,
    LoginComponent,
    AboutComponent,
    CategoriesComponent,
    FooterComponent,
    ContactComponent,
    AnimalGalleryComponent,
    CartComponent,
    ProductsComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    ReactiveFormsModule,FormsModule
  ],
  providers: [AnimalService,ProductService,CartService,CurrencyPipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
