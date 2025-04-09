import { Component } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  name: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  errorMessage: string = '';
  successMessage: string = '';

  constructor(private authService: AuthService) { }

  onSubmit() {
    // Frontend ellenőrzések
    this.successMessage = ''; // Clear success message before validation
    this.errorMessage = ''; // Clear error message before validation

    if (!this.name || !this.email || !this.password || !this.confirmPassword) {
      this.errorMessage = 'Minden mezőt ki kell tölteni!';
      return;
    }

    if (!this.validateEmail(this.email)) {
      this.errorMessage = 'Érvénytelen email formátum!';
      return;
    }

    if (this.password !== this.confirmPassword) {
      this.errorMessage = 'A jelszavak nem egyeznek';
      return;
    }

    const user = {
      name: this.name,
      email: this.email,
      password: this.password,
      password_confirmation: this.confirmPassword
    };

    this.authService.register(user).subscribe(
      (response: any) => {
        this.successMessage = 'Sikeres regisztráció';
        this.errorMessage = '';
        this.clearForm();
      },
      (error) => {
        console.error('Regisztrációs hiba:', error); // Logolja a teljes hibát a konzolra
        this.successMessage = ''; // Töröljük a sikeres üzenetet
        if (error.error) {
          if (error.error.errors) {
            // Laravel validációs hibák kezelése (beleértve a jelszó hibákat)
            const errors = error.error.errors;
            this.errorMessage = Object.keys(errors)
              .map((key) => `${key}: ${errors[key].join(' ')}`)
              .join(' ');
          } else if (error.error.message) {
            // Egyéb Laravel hibák kezelése üzenettel
            this.errorMessage = error.error.message;
          } else if (typeof error.error === 'string') {
            // Kezeljük azokat a hibákat, amelyek csak egy szöveges üzenetet tartalmaznak
            this.errorMessage = error.error;
          } else {
            this.errorMessage = 'A regisztráció sikertelen. Kérjük próbálja újra!';
          }
        } else if (error.message) {
          // Kezeljük azokat a hibákat, amelyeknek van message tulajdonsága
          this.errorMessage = error.message;
        } else {
          // Egyéb, váratlan hibák kezelése
          this.errorMessage = 'A regisztráció sikertelen. Kérjük próbálja újra!';
        }
      }
    );
  }
        

  validateEmail(email: string): boolean {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailRegex.test(email);
  }

  clearForm() {
    this.name = '';
    this.email = '';
    this.password = '';
    this.confirmPassword = '';
  }
}