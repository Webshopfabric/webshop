import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service'; 

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  token: string | null = null;
  resetPasswordForm: FormGroup;

  constructor(private route: ActivatedRoute, private authService: AuthService, private router: Router, private fb: FormBuilder) {
    this.resetPasswordForm = this.fb.group({
      password: ['', [Validators.required, Validators.minLength(6)]],
      password_confirmation: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit(): void {
    // Token lekérése az URL-ből
    this.token = this.route.snapshot.paramMap.get('token');
    if (!this.token) {
      console.error('Nincs token az URL-ben!');
    }
  }

  onSubmit(): void {
    if (this.resetPasswordForm.valid) {
      if (this.token) {
        const formData = {
          password: this.resetPasswordForm.value.password,
          password_confirmation: this.resetPasswordForm.value.password_confirmation,
          token: this.token
        };

        console.log('Form data:', formData);

        this.authService.resetPassword(formData).subscribe(
        (response) => {
          alert('Jelszó sikeresen visszaállítva!');
          this.router.navigate(['/login']);
        },
        (error) => {
          console.error('Error:', error);
          if (error.status === 401) {
            alert('Hibás jelszó! Ellenőrizze az adatokat.');
          } else if (error.status === 400) {
            alert('Nincs érvényes token az URL-ben!');
          } else {
            alert('Hiba történt a jelszó visszaállítása során.');
          }
        }
      );
    } else {
      alert('Minden mezőt ki kell tölteni!');
    }
  }
}

}
