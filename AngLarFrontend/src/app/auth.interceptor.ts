import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('authToken');  // Token kinyerése a localStorage-ból

    if (token) {
      const cloned = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`  // Hozzáadjuk a token-t a header-hez
        }
      });
      return next.handle(cloned);  // Visszaadjuk a módosított kérést
    }

    return next.handle(req);  // Ha nincs token, akkor simán végigmegy a kérés
  }
}
