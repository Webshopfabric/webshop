import { Component } from '@angular/core';

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

  onSubmit() {
    // Validáció
    if (!this.email || !this.password) {
      this.errorMessage = 'All fields must be filled out!';
      return;
    }

    if (!this.validateEmail(this.email)) {
      this.errorMessage = 'Invalid email format!';
      return;
    }

    // Sikeres bejelentkezés
    this.successMessage = 'Succesfully logged in!';
    this.errorMessage = '';
    console.log('Bejelentkezési adatok:', { email: this.email, password: this.password });
  }

  validateEmail(email: string): boolean {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailRegex.test(email);
  }
}
