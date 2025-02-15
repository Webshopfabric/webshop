import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
// import { Category } from './category';


export class Category {
  id?: number;
  title?: string;
  description?: string;
}


@Injectable()
export class CategoryService {
  private categoriesUrl = 'http://localhost:3000/categories';

  constructor(private http: HttpClient) { }

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.categoriesUrl);
  }

  getCategory(id: number): Observable<Category> {
    return this.http.get<Category>(`${this.categoriesUrl}/${id}`);
  }

  createCategory(category: Category): Observable<Category> {
    return this.http.post<Category>(this.categoriesUrl, category);
  }

  updateCategory(category: Category): Observable<Category> {
    return this.http.put<Category>(`${this.categoriesUrl}/${category.id}`, category);
  }

  deleteCategory(category: Category): Observable<Category> {
    return this.http.delete<Category>(`${this.categoriesUrl}/${category.id}`);
  }
}
