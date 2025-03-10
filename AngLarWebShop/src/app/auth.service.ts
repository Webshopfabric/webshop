import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
<<<<<<< HEAD
  private apiUrl = 'http://localhost:8000/api'; // Laravel API URL
  private isAdminSubject = new BehaviorSubject<boolean>(false);
  isAdmin$ = this.isAdminSubject.asObservable();

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    // Kezdetben ellenőrizzük a tárolt szerepet
    const storedRole = localStorage.getItem('userRole');
    if (storedRole) {
      this.isAdminSubject.next(storedRole === 'admin');
    }
  }
=======
  private apiUrl = 'http://localhost:8000/users'; // JSON Server API

  constructor(private http: HttpClient) {}
>>>>>>> 717d3d675d98acc0369456deb385d32d621329c0

  register(userData: any): Observable<any> {
    return this.http.post(this.apiUrl, userData); // Felhasználó létrehozása
  }

  setRole(role: 'admin' | 'customer'): void {
    localStorage.setItem('userRole', role);
    this.isAdminSubject.next(role === 'admin');
    // Az aktuális útvonal újratöltése
    const currentUrl = this.router.url;
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
      this.router.navigate([currentUrl]);
    });
  }

  toggleRole(): void {
    const currentRole = this.isAdminSubject.value;
    this.setRole(currentRole ? 'customer' : 'admin');
  }

  getRole(): string {
    return localStorage.getItem('userRole') || 'customer';
  }
}
