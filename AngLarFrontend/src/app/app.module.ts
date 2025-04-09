import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ProductService } from './product.service';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { ProductsComponent } from './products/products.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { AboutComponent } from './about/about.component';
import { CategoriesComponent } from './categories/categories.component';
import { FooterComponent } from './footer/footer.component';
import { ContactComponent } from './contact/contact.component';
import { AnimalGalleryComponent } from './animal-gallery/animal-gallery.component';
import { HttpClientModule,HTTP_INTERCEPTORS } from '@angular/common/http';
import { AnimalService } from './animal.service';
import { CartComponent } from './cart/cart.component';
import { CartService } from './cart.service';
import { CurrencyPipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { registerLocaleData } from '@angular/common';
import localeHu from '@angular/common/locales/hu';
import { LOCALE_ID } from '@angular/core';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { AuthInterceptor } from './auth.interceptor';
import { AuthService } from './auth.service';
import { LogoutComponent } from './logout/logout.component';
import { ProfileComponent } from './profile/profile.component';
registerLocaleData(localeHu);

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
    ProductsComponent,
    ResetPasswordComponent,
    ForgotPasswordComponent,
    LogoutComponent,
    ProfileComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    ReactiveFormsModule, FormsModule
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'hu-HU' }, 
    AnimalService, 
    ProductService, 
    CartService, 
    CartService, 
    CurrencyPipe,
    AuthService,
    {
    // AuthInterceptor használata a HTTP kérésekhez
    provide: HTTP_INTERCEPTORS, 
    useClass: AuthInterceptor, 
    multi: true
    }
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }
