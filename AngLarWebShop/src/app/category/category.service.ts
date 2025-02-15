import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category } from './category';

@Injectable({
  providedIn: 'root'  // Ez a fontos rész
})
export class CategoryService {
  private categoriesUrl = 'http://localhost:8000/categories';
  constructor(private http: HttpClient) { }

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.categoriesUrl);
  }

  createCategory(category: Category): Observable<Category> {
    return this.http.post<Category>(this.categoriesUrl, category);
  }

  // ... többi metódus ...
} 