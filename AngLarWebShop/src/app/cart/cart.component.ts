
import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart.service';
import { CommonModule,CurrencyPipe } from '@angular/common';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit {

  cartItems: any[] = [];
test_price:number=1234567.45;

  constructor(private cartService: CartService) { }

  ngOnInit() {
    this.loadCart();
  }

  // Kosár betöltése (tartalom frissítése)
  loadCart() {
    this.cartItems = this.cartService.getCart();
  }

  getTotal(): number {
    return this.cartItems.reduce((total, item) => total + item.quantity * item.price, 0);
  }

  // Kosár törlése és frissítés
  clearCart() {
    this.cartService.clearCart();
    this.loadCart(); // Kosár újratöltése az UI-n
  }

  increaseQuantity(item: any) {
    item.quantity++;
    this.cartService.updateQuantity(item.id, item.quantity);
  }

  decreaseQuantity(item: any) {
    if (item.quantity > 1) {
      item.quantity--;
      this.cartService.updateQuantity(item.id, item.quantity);
    }else{
      this.removeItem(item); // Ha 1-nél kisebb lenne, töröljük
    }
  }
/** Kosárból törlés */
removeItem(itemToRemove: any) {
  this.cartItems = this.cartItems.filter(item => item.id !== itemToRemove.id);
  this.cartService.updateQuantity(itemToRemove.id, 0); // 0-ra állítjuk a mennyiséget, így törlődik
}

checkout() {
  if (this.cartItems.length === 0) {
    alert("Your cart is empty! Please add items before checkout.");
    return;
  }

  const confirmed = confirm(`Are you sure you want to complete the purchase? Total: ${this.getTotal() }`);

  if (confirmed) {
    alert("Please Login.");
    // this.clearCart(); // Kosár törlése
  }
}



}
