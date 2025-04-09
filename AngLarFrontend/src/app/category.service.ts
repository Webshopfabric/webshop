// getCategories(): Observable<any> {
//   return this.http.get<any>(this.categoriesUrl);
// }

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private baseUrl = 'http://localhost:8000/api';  // Alap API URL local
  private baseUrl_ = 'http://www.anglar.testhosting.hu/AngLarBackend/public/api'; //webserver URL
 
  private categoriesUrl = `${this.baseUrl}/categories`; // Kategória végpontok

  constructor(private http: HttpClient) { }

  // GET /api/categories - Összes kategória lekérése
  getCategories(): Observable<any> {
    return this.http.get(`${this.baseUrl}/categories`); // mindenkinek elérhető
  }

  // POST /api/category - Új kategória létrehozása
  createCategory(title: string, description: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/admin/categories`, { title, description });
  }

  // PUT /api/category/{id} - Kategória módosítása
  updateCategory(id: number, title: string, description: string): Observable<any> {
    return this.http.put(`${this.baseUrl}/admin/categories/${id}`, { title, description });
  }

  // DELETE /api/category/{id} - Kategória törlése
  deleteCategory(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/admin/categories/${id}`);
  }

  // GET /api/category/{id} - Egy kategória lekérése
  getCategory(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/admin/categories/${id}`);
  }
}
