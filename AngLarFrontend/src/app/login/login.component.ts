import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';
  successMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    // Töröljük az előző hibaüzeneteket
    this.successMessage = '';
    this.errorMessage = '';

    // Validáció
    if (!this.email || !this.password) {
      this.errorMessage = 'Minden mezőt ki kell tölteni!';
      return;
    }

    if (!this.validateEmail(this.email)) {
      this.errorMessage = 'Érvénytelen email formátum!';
      return;
    }

    const user = {
      email: this.email,
      password: this.password
    };

    this.authService.login(user).subscribe(
      () => {
        this.successMessage = 'Sikeres bejelentkezés!';
        this.errorMessage = '';
        this.router.navigate(['/products']);
      },
      (error) => {
        console.log(error); // Hiba a konzolon
        this.errorMessage = error.message || 'A bejelentkezés sikertelen';
        this.successMessage = '';
      }
    );
  }

  validateEmail(email: string): boolean {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailRegex.test(email);
  }
}
