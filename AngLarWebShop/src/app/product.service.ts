import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private baseUrl0 = 'http://localhost:8000/api';
  private baseUrl = 'http://www.anglar.testhosting.hu/project10/public/api';

  constructor(private http: HttpClient) { }

  // GET /api/products - Összes termék lekérése
  getProducts(): Observable<any> {
    return this.http.get(`${this.baseUrl}/products`);
  }

  // GET /api/product/{id} - Egy termék lekérése
  getProduct(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/products/${id}`);
  }

  // POST /api/product - Új termék létrehozása
  createProduct(product: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/products`, product);
  }

  // PUT /api/product/{id} - Termék módosítása
  updateProduct(id: number, product: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/products/${id}`, product);
  }

  // DELETE /api/product/{id} - Termék törlése
  deleteProduct(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/products/${id}`);
  }

  // GET /api/products/category/{categoryId} - Kategória alapján szűrés
  getProductsByCategory(categoryId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/products/category/${categoryId}`);
  }

  // GET /api/products/search/{query} - Termékek keresése
  searchProducts(query: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/products/search/${query}`);
  }
}

  // getCategories(): Observable<any[]> {

  //   return of([
  //     { title: 'Vonós hangszer', description: '..........'},
  //     { title: 'Fúvós hangszer', description: '..........'},
  //     { title: 'Ütős hangszer', description: '..........'},
  //   ]);
  // }





