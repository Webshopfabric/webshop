import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html'
})
export class ForgotPasswordComponent {
  email: string = '';
  errorMessage: string = '';
  successMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  sendResetLink() {
    if (!this.email) {
      this.errorMessage = 'Kérjük, adja meg az email címét.';
      this.successMessage = '';
      return;
    }
  
    this.authService.sendResetLink(this.email).subscribe(
      response => {
        console.log('Reset link sent', response);
        this.successMessage = 'A jelszó visszaállító linket elküldtük az e-mail címére.';
        this.errorMessage = '';
      },
      error => {
        console.error('Error response:', error);
        if (error.status === 404) {
          this.errorMessage = 'Nincs ilyen e-mail cím.';
        } else {
          this.errorMessage = 'Hiba történt a kérés feldolgozása során. Még nincs megereősítve az email cím!';
        }
        this.successMessage = '';
      }
    );
  }
}