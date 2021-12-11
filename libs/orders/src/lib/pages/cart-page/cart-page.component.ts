import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CartItemDetailed } from '../../models/cart';
import { CartService } from '../../services/cart.service';
import { OrdersService } from '../../services/orders.service';

@Component({
  selector: 'orders-cart-page',
  templateUrl: './cart-page.component.html',
  styles: [
  ]
})
export class CartPageComponent implements OnInit, OnDestroy {


  cartItemsDetailed : CartItemDetailed[] = [];
  cartCounts = 0;
  endSubs$ : Subject<any> = new Subject();

  constructor(private router: Router,
              private cartService : CartService,
              private orderService : OrdersService) { }

  ngOnInit(): void {
    this._getCartDetails();
  }

  ngOnDestroy() {
    this.endSubs$.next();
    this.endSubs$.complete();
  }

  backToShop(){
    this.router.navigate(['/products']);
  }


  deleteCartItem(cartItem: CartItemDetailed){

   this.cartService.deleteCartItem(cartItem.product.id); 
  }


  updateCartItemQuantity(event: any,cartItem: CartItemDetailed){
    this.cartService.setCartItem({
      productId: cartItem.product.id,
      quantity: event.value
    },true); 
  }

 private _getCartDetails() {
  this.cartService.cart$.pipe(takeUntil(this.endSubs$)).subscribe(respCart=>{
    this.cartItemsDetailed = [];
    this.cartCounts = respCart?.items.length ?? 0;
    respCart.items.forEach(cartItem=>{
      this.orderService.getProduct(cartItem.productId).subscribe((respProduct)=>{
        this.cartItemsDetailed.push({
          product  : respProduct,
          quantity : cartItem.quantity
        })
      });      
    })
  });
 }

}
