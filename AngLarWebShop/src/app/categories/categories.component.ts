import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css'
})
export class CategoriesComponent implements OnInit {

  products: any[] = [];
  filteredProducts: any[] = [];
  categories: any[] = [];
  selectedCategories: string[] = [];



constructor (private productService:ProductService){}


ngOnInit(): void {
  // this.productService.getProducts().subscribe(
  //   (data: any) => {
  //     this.products = data;
  //     this.filteredProducts = data;
  //   });

    this.productService.getCategories().subscribe((data: any) => {
      this.categories = data;
      console.log(this.categories)
    });

  }
}
