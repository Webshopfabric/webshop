import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { CartService } from '../cart.service';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {


  products: any[] = [];
  itemAdded: boolean=false;

  constructor(
    private productService: ProductService,
    private cartService: CartService
  ) { }

  ngOnInit(): void {
    this.productService.getProducts().subscribe(
      (data: any) => {
        this.products = data;
      });
  }


  addToCart(product: any): void {
    if (!product) {
      alert("There was a problem adding the product to the cart.");
      return;
    } else {
      this.cartService.addToCart(product);
      console.log(product.title + ' has been added to cart!');
      // alert(`${product.title} has been added to the cart!`);


      // this.itemAdded = true;
      // setTimeout(() => {
      //   this.itemAdded = false;
      // }, 500);


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
}



