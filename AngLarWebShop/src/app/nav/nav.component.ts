import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent implements OnInit {
  cartItemCount: number = 0;

  constructor(private cartService: CartService) { }

  ngOnInit() {
    this.updateCartCount();

    // Figyeljük a kosár változásait
    this.cartService.cartUpdated.subscribe(() => {
      this.updateCartCount();
    });
  }

  updateCartCount() {
    this.cartItemCount = this.cartService.getCartItemCount();
  }

  closeMenu() {
    const navBar = document.getElementById('navbarNav');
    if (navBar) {
      navBar.classList.remove('show'); // Bezárjuk a menüt
    }
  }

  // Menü bezárása mobil nézetben
  // closeMenu() {
  //  if (window.innerWidth <= 768) {  // Csak mobil nézetben
  //    const collapseElement = document.getElementById('navbarNav');
  //   if (collapseElement) {
  //      collapseElement.classList.remove('show');  // Bezárja a menüt
  //    }
  //  }
  // }
}





