import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../category.service';
import { AuthService } from '../auth.service';

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
    private categoryService: CategoryService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.isAdmin = this.authService.isLoggedIn() && this.authService.isAdmin(); // Ellenőrizzük, hogy admin-e
    
    // Figyeljük az admin státusz változását
    this.authService.isLoggedInChanged.subscribe(() => {
    this.isAdmin = this.authService.isLoggedIn() && this.authService.isAdmin();
     });
    
    
    this.loadCategories(); // Kategóriák betöltése
  
  }

  isAdmin_toggle() {
    this.isAdmin = !this.isAdmin;
    this.isAdmin = this.authService.isLoggedIn() && this.authService.isAdmin(); // Ellenőrizzük, hogy admin-e
    this.loadCategories(); // Kategóriák betöltése
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
      this.categories = this.categories.filter((category) => category.id !== id);
    });
  }

  // Kategória frissítése
  updateCategory(id: number, newTitle: string, newDescription: string): void {
    this.categoryService.updateCategory(id, newTitle, newDescription).subscribe((category) => {
      const index = this.categories.findIndex((cat) => cat.id === id);
      if (index !== -1) {
        this.categories[index] = category; 
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

