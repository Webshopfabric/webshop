import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../category.service';

@Component({
  selector: 'app-category',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
  categories: any[] = [];
  isAdmin: boolean = true;
  newCategory = {
    title: '',
    description: ''
  };

  constructor(
    private categoryService: CategoryService
  ) { }

  ngOnInit(): void {
    this.isAdmin = true;
    this.loadCategories();
  }

  isAdmin_toggle() {
    this.isAdmin = !this.isAdmin;
  }


  // Kategóriák betöltése
  loadCategories(): void {
    this.categoryService.getCategories().subscribe((data) => {
      this.categories = data;
    });
  }

  // Kategória hozzáadása
  addCategory(title: string, description: string): void {
    this.categoryService.createCategory(title, description).subscribe((category) => {
      this.categories.push(category); // Hozzáadjuk az új kategóriát a listához
    });
  }

  // Kategória törlése
  deleteCategory(id: number): void {
    this.categoryService.deleteCategory(id).subscribe(() => {
      this.categories = this.categories.filter((category) => category.id !== id); // Eltávolítjuk a törölt kategóriát
    });
  }

  // Kategória frissítése
  updateCategory(id: number, newTitle: string, newDescription: string): void {
    this.categoryService.updateCategory(id, newTitle, newDescription).subscribe((category) => {
      const index = this.categories.findIndex((cat) => cat.id === id);
      if (index !== -1) {
        this.categories[index] = category; // Frissítjük a kategóriát a listában
      }
    });
  }

  saveCategory(): void {
    this.categoryService.createCategory(this.newCategory.title, this.newCategory.description)
      .subscribe(category => {
        this.categories.push(category);
        // Form törlése
        this.newCategory = {
          title: '',
          description: ''
        };
      });
  }
}

