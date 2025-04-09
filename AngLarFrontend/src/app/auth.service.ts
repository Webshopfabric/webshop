import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:8000/api';  // Backend API URL
  private baseUrl_ = 'http://www.anglar.testhosting.hu/AngLarBackend/public/api'; //webserver URL
  isLoggedInChanged = new EventEmitter<boolean>();
  customerNameChanged = new EventEmitter<string | null>();

  constructor(private http: HttpClient) { }

  // Regisztráció
  register(user: { name: string; email: string; password: string; password_confirmation: string }): Observable<any> {
    return this.http.post(`${this.baseUrl}/register`, user);
  }

  // Bejelentkezés
  login(customer: { email: string; password: string }): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, customer).pipe(
      tap((response: any) => {

        console.log('Backend válasz:', response);
        
        if (!response.customer) {
          console.log("A backend válasz nem tartalmaz customer adatokat.");
          console.error('A backend válasz nem tartalmaz customer adatokat.');
          throw new Error('A backend válasz nem tartalmaz customer adatokat.');
        }
        if (!response.customer.token) {
          console.log("A backend válasz nem tartalmaz tokent.");
          console.error('A backend válasz nem tartalmaz tokent.');
          throw new Error('A backend válasz nem tartalmaz tokent.');
        }
        
        const customerData = response.customer;
        localStorage.setItem('authToken', customerData.token);
        localStorage.setItem('customerRole', customerData.role);
        localStorage.setItem('customerName', customerData.name);
        // Értesítjük a változásokról
        this.isLoggedInChanged.emit(true);
        this.customerNameChanged.emit(customerData.name);
      })
    );
  }
  
  // Elfelejtett jelszó küldése
  sendResetLink(email: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/password/forgot`, { email });
  }

  // Jelszó visszaállítása
  resetPassword(data: { token: string; password: string; password_confirmation: string }): Observable<any> {
    return this.http.post(`${this.baseUrl}/password/reset`, data);
  }

  // Token ellenőrzése, ha be van jelentkezve
  isLoggedIn(): boolean {
    return !!localStorage.getItem('authToken');  // Ha van tárolt token, akkor be van jelentkezve
  }

  // Token elmentése
  setAuthToken(token: string): void {
    localStorage.setItem('authToken', token);  // Elmentjük a tokent localStorage-ban
  }

  // Token eltávolítása
  logout(): Observable<any> {
    return this.http.post(`${this.baseUrl}/logout`, {}, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('authToken')}`
      }
    }).pipe(
      tap(() => {
        localStorage.removeItem('authToken'); 
        localStorage.removeItem('customerRole'); 
        localStorage.removeItem('customerName');  
      // Értesítjük a változásokról
      this.isLoggedInChanged.emit(false);
        this.customerNameChanged.emit(null);
        

      })
    );
  }
  getCustomerName(): string | null {
    return localStorage.getItem('customerName');
  }


  isAdmin(): boolean {
    const role = localStorage.getItem('customerRole');
    return role === 'admin';
  }
  
}
