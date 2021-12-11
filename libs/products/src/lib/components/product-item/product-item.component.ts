/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { Component, Input } from '@angular/core';
import { CartItem, CartService } from '@holystone/orders';
import { Product } from '../../models/product';


@Component({
  selector: 'products-product-item',
  templateUrl: './product-item.component.html',
  styles: [
  ]
})
export class ProductItemComponent   {

 @Input() product!: Product

   
  constructor(private cartService : CartService) { }


  addProductToCart(){

    const cartItem : CartItem = {
      productId: this.product.id,
      quantity: 1
    };
   
    this.cartService.setCartItem(cartItem);

  }
}
