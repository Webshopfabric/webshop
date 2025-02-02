import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})

export class ProductService {
  private apiUrl = 'https://fakestoreapi.com/products';  //?limit=10

  constructor(private http: HttpClient) {}

  getProducts(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }




  // getProducts(): Observable<any[]> {

  //   return of([
  //     { title: 'Smartphone', description: 'A fast smartphone', price: 299, image: 'https://via.placeholder.com/150' },
  //     { title: 'Laptop', description: 'High performance laptop', price: 999, image: 'https://via.placeholder.com/150' },
  //     { title: 'Headphones', description: 'Noise-cancelling headphones', price: 199, image: 'https://via.placeholder.com/150' },
  //   ]);
  // }





}
