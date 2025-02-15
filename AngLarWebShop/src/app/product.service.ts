import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})

export class ProductService {
  // private apiUrl = 'https://fakestoreapi.com/products';  //?limit=10  // kezdeti teszt volt

  private apiUrl = 'http://localhost:8000/api/products';

  // private categoriesUrl = 'http://localhost:8000/api/categories';
  // private productsUrl = 'http://localhost:8000/api/products';

  private categoriesUrl = 'http://www.anglar.testhosting.hu/project10/public/api/categories';
  private productsUrl = 'http://www.anglar.testhosting.hu/project10/public/api/products';



  constructor(private http: HttpClient) { }

  getProducts(): Observable<any> {

    return this.http.get<any>(this.productsUrl);
  }

  getCategories(): Observable<any> {
    return this.http.get<any>(this.categoriesUrl);
  }
  getProduct(id: number): Observable<any> {
    const url = `${this.productsUrl}/${id}`;
    return this.http.get<any>(url);

  }

}



// getProducts(): Observable<any[]> {

//   return of([
//     { title: 'Smartphone', description: 'A fast smartphone', price: 299, image: 'https://via.placeholder.com/150' },
//     { title: 'Laptop', description: 'High performance laptop', price: 999, image: 'https://via.placeholder.com/150' },
//     { title: 'Headphones', description: 'Noise-cancelling headphones', price: 199, image: 'https://via.placeholder.com/150' },
//   ]);
// }





