import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { CartService } from '../cart.service';
import { CategoryService } from '../category.service';
import { CurrencyPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

interface Product {
  id: number;
  title: string;
  category_id: number;
  category: string;
  description: string;
  image_url: string;
  price: number;
  stock: number;
  isActive: boolean;
}

interface Category {
  id: number;
  title: string;
}

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  categories: Category[] = [];
  selectedCategories: number[] = [];
  searchQuery: string = '';
  sortDirection: 'asc' | 'desc' | null = null;
  baseImageUrl: string = 'https://localhost:8000/';  //////////////////////////////////////////////////
  show = false;
  itemAdded: boolean = false;
  isAdmin: boolean = true;

  newProduct: Product = {
    id: 0,
    title: '',
    category_id: 0,
    category: '',
    description: '',
    image_url: '',
    price: 0,
    stock: 0,
    isActive: true
  };

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
    private cartService: CartService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.isAdmin = this.authService.isLoggedIn() && this.authService.isAdmin(); 
     // Figyeljük az admin státusz változását
     this.authService.isLoggedInChanged.subscribe(() => {
     this.isAdmin = this.authService.isLoggedIn() && this.authService.isAdmin();
  });
    
    
    this.productService.getProducts().subscribe(
      (data: any) => {
        this.products = data;
        this.filteredProducts = data;
      });

    this.categoryService.getCategories().subscribe((data: any) => {
      this.categories = data;
      console.log("Categories loaded:", this.categories);
    });
  }

  isAdmin_toggle() {
    this.isAdmin = !this.isAdmin;
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

  toggleCategory(categoryId: number): void {

    if (this.selectedCategories.includes(categoryId)) {
      this.selectedCategories = this.selectedCategories.filter(id => id !== categoryId);
    } else {
      this.selectedCategories.push(categoryId);
    }
    // Keresőmező törlése
    this.searchQuery = '';
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

  addToCart(product: Product): void {
    if (!this.authService.isLoggedIn()) {
      alert("Kérlek jelentkezz be a vásárláshoz!");
      this.router.navigate(['/login']); // Átirányítás a bejelentkezési oldalra
      return;
    }

    if (!product) {
      alert("There was a problem adding the product to the cart.");
      return;
    } else {
      this.cartService.addToCart(product);
      console.log(product.title + ' has been added to cart!');
      this.itemAdded = true;
      setTimeout(() => {
        this.itemAdded = false;
      }, 1000);
    }
  }

//--------------------------
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

  createProduct(): void {
    this.productService.createProduct(this.newProduct).subscribe(
      (response: Product) => {
        console.log('Termék sikeresen létrehozva:', response);
        this.ngOnInit();
        this.resetNewProduct();
      },
      (error: any) => {
        console.error('Hiba történt a termék létrehozásakor:', error);
      }
    );
  }

  resetNewProduct(): void {
    this.newProduct = {
      id: 0,
      title: '',
      category_id: 0,
      category: '',
      description: '',
      image_url: '',
      price: 0,
      stock: 0,
      isActive: true
    };
  }

  updateProduct(product: Product): void {
    this.productService.updateProduct(product.id, product).subscribe(
      (response: Product) => {
        console.log('Termék sikeresen frissítve:', response);
        this.ngOnInit();
      },
      (error: any) => {
        console.error('Hiba történt a termék frissítésekor:', error);
      }
    );
  }

  deleteProduct(productId: number): void {
    if (confirm('Biztosan törölni szeretnéd ezt a terméket?')) {
      this.productService.deleteProduct(productId).subscribe(
        (response: Product) => {
          console.log('Termék sikeresen törölve:', response);
          this.ngOnInit();
        },
        (error: any) => {
          console.error('Hiba történt a termék törlésekor:', error);
        }
      );
    }
  }

  getCategoryName(categoryId: number): string {
    const category = this.categories.find(c => c.id === categoryId);
    return category ? category.title : 'Ismeretlen kategória';
  }

  editProduct(product: Product): void {
    // A termék adatait beállítjuk a szerkesztő űrlapba
    this.newProduct = { ...product };
    // Görgetünk az űrlaphoz
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // Segédfüggvény a teljes kép URL összeállításához
  getFullImageUrl(imageUrl: string): string {
    if (!imageUrl) return 'assets/placeholder.jpg';
    if (imageUrl.startsWith('http')) return imageUrl;
    return this.baseImageUrl + imageUrl;
  }

  // Segédfüggvény a kép URL mentéséhez (csak a fájlnevet mentjük)
  getImageFileName(imageUrl: string): string {
    if (!imageUrl) return '';
    if (imageUrl.startsWith('http')) {
      return imageUrl.split('/').pop() || '';
    }
    return imageUrl;
  }

  
}



