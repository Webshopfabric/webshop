import { Component } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  errorMessage: string = '';
  successMessage: string = '';

  onSubmit() {
    // Validáció
    if (!this.email || !this.password || !this.confirmPassword) {
      this.errorMessage = 'All fields must be filled out!';
      this.successMessage = '';
      return;
    }

    if (this.password !== this.confirmPassword) {
      this.errorMessage = 'Password do not match!';
      this.successMessage = '';
      return;
    }

    if (!this.validateEmail(this.email)) {
      this.errorMessage = 'Invalid email format!';
      this.successMessage = '';
      return;
    }

    // Sikeres regisztráció
    this.successMessage = 'Succesful Registration!';
    this.errorMessage = '';
    console.log('Regisztrált adatok:', { email: this.email, password: this.password });
  }

  validateEmail(email: string): boolean {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailRegex.test(email);
  }
}
