import { Component, OnInit } from '@angular/core';
import { CategoryService } from './category.service';
import { Category } from './category';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-category',
  template: `
    <div *ngIf="categories">
      <h2>Categories</h2>
      <ul>
        <li *ngFor="let category of categories">
          {{category.title}}
        </li>
      </ul>
      <button *ngIf="!creatingCategory" (click)="createCategory()">Add Category</button>
      <div *ngIf="creatingCategory">
        <input [(ngModel)]="newCategory.title" placeholder="Category name">
        <button (click)="saveCategory()">Save</button>
      </div>
    </div>
  `,
  styleUrls: ['./category.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class CategoryComponent implements OnInit {
  categories!: Category[];
  creatingCategory = false;
  newCategory: Category = new Category();

  constructor(private categoryService: CategoryService) { }

  ngOnInit(): void {
    this.getCategories();
  }

  getCategories(): void {
    this.categoryService.getCategories().subscribe((categories: Category[]) => {
      this.categories = categories;
    });
  }

  createCategory(): void {
    this.creatingCategory = true;
    this.newCategory = new Category();
  }

  saveCategory(): void {
    this.categoryService.createCategory(this.newCategory).subscribe((category: Category) => {
      this.categories.push(category);
      this.creatingCategory = false;
    });
  }
}












// import { Component, OnInit } from '@angular/core';
// import { ProductService } from '../product.service';

// @Component({
//   selector: 'app-categories',
//   templateUrl: './categories.component.html',
//   styleUrl: './categories.component.css'
// })
// export class CategoriesComponent implements OnInit {

//   products: any[] = [];
//   filteredProducts: any[] = [];
//   categories: any[] = [];
//   selectedCategories: string[] = [];



// constructor (private productService:ProductService){}


// ngOnInit(): void {
//   // this.productService.getProducts().subscribe(
//   //   (data: any) => {
//   //     this.products = data;
//   //     this.filteredProducts = data;
//   //   });

//     this.productService.getCategories().subscribe((data: any) => {
//       this.categories = data;
//       console.log(this.categories)
//     });

//   }
// }
