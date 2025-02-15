import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { CartService } from '../cart.service';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    CurrencyPipe,
    FormsModule,
  ],
})
export class ProductsComponent implements OnInit {


  itemAdded: boolean=false;
  products: any[] = [];
  filteredProducts: any[] = [];
  categories: any[] = [];
  selectedCategories: string[] = [];
  searchQuery: string = '';
  sortDirection: 'asc' | 'desc' | null = null;

  constructor(
    private productService: ProductService,
    private cartService: CartService
  ) { }

  ngOnInit(): void {
    this.productService.getProducts().subscribe(
      (data: any) => {
        this.products = data;
        this.filteredProducts = data;
      });

      this.productService.getCategories().subscribe((data: any) => {
        this.categories = data;
        console.log("Categories loaded:", this.categories);
      });

  }

  applyFilters(): void {
    this.filteredProducts = this.products.filter((product) => {
      const matchesCategory =
        this.selectedCategories.length === 0 ||
        this.selectedCategories.includes(product.category_id);
      const matchesSearch = product.title.toLowerCase().includes(this.searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });

    if (this.sortDirection) {
      this.filteredProducts.sort((a, b) =>
        this.sortDirection === 'asc' ? a.price - b.price : b.price - a.price
      );
    }
  }

  toggleCategory(categoryId: string): void {

    if (this.selectedCategories.includes(categoryId)) {
      this.selectedCategories = this.selectedCategories.filter(id => id !== categoryId);
    } else {
      this.selectedCategories.push(categoryId);
    }
    this.filterProducts();

  }
  filterProducts(): void {
    if (this.selectedCategories.length === 0) {
      this.filteredProducts = this.products; // Ha nincs kiválasztott kategória, mutassuk az összeset
    } else {
      this.filteredProducts = this.products.filter(product =>
        this.selectedCategories.includes(product.category_id)
      );
    }
    // this.applyFilters();
  }

  searchProducts(): void {
    this.applyFilters();
  }

  sortByPrice(direction: 'asc' | 'desc'): void {
    this.sortDirection = direction;
    this.applyFilters();
  }

  addToCart(product: any): void {
    if (!product) {
      alert("There was a problem adding the product to the cart.");
      return;
    } else {
      this.cartService.addToCart(product);
      console.log(product.title + ' has been added to cart!');
      // alert(`${product.title} has been added to the cart!`);
      product.showDetails =false; // reset the showDetails property

      this.itemAdded = true;
      setTimeout(() => {
        this.itemAdded = false;
      }, 1000);


    }
  }

//--------------------------
  show = false;
  showToast() {
    this.show = true;
    // Toast automatikus eltűnése 5 másodperc után
    setTimeout(() => {
      this.show = false;
    }, 500);
  }
  closeToast() {
    this.show = false;
  }


//---------------
viewProduct(product: any): void {
  product.showDetails = true;
}

}



