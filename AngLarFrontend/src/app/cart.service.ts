import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {

  private cart: any[] = [];
  cartUpdated = new BehaviorSubject<number>(0);  // Értesítés a változásokról

  constructor() {
    this.loadCart(); // Betölti a kosár tartalmát induláskor

    // Ha van adat a localStorage-ben, betöltjük a kosarat
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      this.cart = JSON.parse(savedCart);
    }
  }

  private loadCart() {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      this.cart = JSON.parse(savedCart);
      this.cartUpdated.next(this.getCartItemCount()); // Frissítés induláskor
    }
  }

  updateQuantity(productId: number, quantity: number): void {
    const product = this.cart.find(item => item.id === productId);
    if (product) {
      product.quantity = quantity;
      if (product.quantity <= 0) {
        this.cart = this.cart.filter(item => item.id !== productId);
      }
      localStorage.setItem('cart', JSON.stringify(this.cart));
      this.cartUpdated.next(this.getCartItemCount()); // 🔥 Értesítjük a Navbar-t is!
    }
  }





  // Kosárhoz hozzáadás
  addToCart(product: any): void {
    const existingProduct = this.cart.find(item => item.id === product.id);

    if (existingProduct) {
      existingProduct.quantity++;
    } else {
      this.cart.push({ ...product, quantity: 1 });
    }

    this.updateLocalStorage();
    console.log(`${product.title} added to the cart! (cart.service)`);
    this.cartUpdated.next(this.getCartItemCount()); // Értesítés az összes komponensnek
  }


  getCart(): any[] {
    return this.cart;
  }
  getCartItemCount(): number {
    return this.cart.reduce((total, item) => total + item.quantity, 0);
  }


  // Kosár törlése
  clearCart(): void {
    this.cart = [];
    localStorage.removeItem('cart');
    this.cartUpdated.next(0); // Frissítés nullára
    console.log('Cart is cleared!');


  }

  // Kosár frissítése a localStorage-ben a későbbiekben lehet, hogy kelleni fog.
  private updateLocalStorage(): void {
    localStorage.setItem('cart', JSON.stringify(this.cart));
  }
}
