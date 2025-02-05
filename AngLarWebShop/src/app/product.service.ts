import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})

export class ProductService {
  // private apiUrl = 'https://fakestoreapi.com/products';  //?limit=10
  private apiUrl = 'http://localhost:8000/api/products';  //?limit=10

  constructor(private http: HttpClient) {}

  getProducts(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

}
