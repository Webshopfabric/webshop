import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart.service';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent implements OnInit {
  cartItemCount: number = 0;
  customerName: string | null = null; // Változó a név tárolására
  isAdmin: boolean = false; // Változó az admin státusz tárolására
  isLoggedIn: boolean = false; // Változó a bejelentkezett státusz tárolására
  constructor(private cartService: CartService, private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.updateCartCount();

    // Figyeljük a kosár változásait
    this.cartService.cartUpdated.subscribe(() => {
      this.updateCartCount();
    });
    // Inicializálás
    this.isLoggedIn = this.authService.isLoggedIn();
    this.customerName = this.authService.getCustomerName();
    this.isAdmin = this.authService.isAdmin();
    // Feliratkozás az állapotváltozásokra
    this.authService.isLoggedInChanged.subscribe((loggedIn) => {
      this.isLoggedIn = loggedIn;
      this.isAdmin = this.authService.isAdmin(); // Frissítjük az admin státuszt
      console.log('Is Admin Changed:', this.isAdmin); // Ellenőrzés

    });
    this.authService.customerNameChanged.subscribe((name) => {
      this.customerName = name;
      console.log('Customer Name Changed:', name); 
    });

  this.customerName = this.authService.getCustomerName();
  console.log('Customer Name:', this.customerName); // Ellenőrzés

  // Admin jogosultság ellenőrzése
    this.isAdmin = this.authService.isAdmin();
    console.log('Is Admin:', this.isAdmin); // Ellenőrzés
// Bejelentkezett státusz ellenőrzése
    this.isLoggedIn = this.authService.isLoggedIn();
    console.log('Is Logged In:', this.isLoggedIn); // Ellenőrzés
  
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

  logout() {
    this.authService.logout().subscribe(() => {
      this.cartService.clearCart(); // Kosár tartalmának törlése
      this.customerName = null; // Frissítjük a customerName értékét
      this.isAdmin = false; // Frissítjük a isAdmin értékét
      this.isLoggedIn = false; // Frissítjük a isLoggedIn értékét
      this.router.navigate(['/products']);
    });
  }
  
}



