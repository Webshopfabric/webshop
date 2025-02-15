import { Component, OnInit } from '@angular/core';
import { CategoryService } from './category.service';
import { Category } from './category';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  categories: Category[];
  creatingCategory = false;
  newCategory: Category;

  constructor(private categoryService: CategoryService) { }

  ngOnInit(): void {
    this.getCategories();
  }

  getCategories(): void {
    this.categoryService.getCategories().subscribe(categories => {
      this.categories = categories;
    });
  }

  createCategory(): void {
    this.creatingCategory = true;
    this.newCategory = new Category();
  }

  saveCategory(): void {
    this.categoryService.createCategory(this.newCategory).subscribe(category => {
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
