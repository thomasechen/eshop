import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { UsersService } from '@holystone/users';
import { OrderItem } from '../../models/order-item';
import { Order } from '../../models/orders';
import { Cart } from '../../models/cart';
import { OrdersService } from '../../services/orders.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';


@Component({
  selector: 'orders-checkout-page',
  templateUrl: './checkout-page.component.html'
})
export class CheckoutPageComponent implements OnInit,OnDestroy {

  checkoutFormGroup!: FormGroup;
  isSubmitted = false;
  orderItems: OrderItem[] = [];
  //userId = '61a393c58cff1a31645fc2e2';
  userId?: string;
  countries: any[] = [] ;;
  unsubscribe$ : Subject<any> = new Subject();

  constructor(
    private router: Router,
    private usersService: UsersService,
    private formBuilder: FormBuilder,
    private cartService : CartService,
    private orderService : OrdersService,
  ) {}


  ngOnInit(): void {
    this._initCheckoutForm();
    this._autoFillUserData();
    this._getCartItems();
    this._getCountries();
  }


 ngOnDestroy(){
   this.unsubscribe$.next();
   this.unsubscribe$.complete();
 }

  private _getCartItems(){
    const cart: Cart = this.cartService.getCart();
    this.orderItems = cart.items.map((item)=>{
      return {
        product: item.productId,
        quantity: item.quantity
      }
    })
  }

 private _autoFillUserData(){
   this.usersService.observeCurrentUser().pipe(takeUntil(this.unsubscribe$)).subscribe((user)=>{
       if(user){
        this.userId = user.id
        this.checkoutForm.name.setValue(user?.name);
        this.checkoutForm.email.setValue(user?.email);
        this.checkoutForm.phone.setValue(user?.phone);
        this.checkoutForm.city.setValue(user?.city);
        this.checkoutForm.country.setValue(user?.country);
        this.checkoutForm.zip.setValue(user?.zip);
        this.checkoutForm.apartment.setValue(user?.apartment);
        this.checkoutForm.street.setValue(user?.street);
       }

   })
 }


  private _initCheckoutForm() {
    this.checkoutFormGroup = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.email, Validators.required]],
      phone: ['', Validators.required],
      city: ['', Validators.required],
      country: ['', Validators.required],
      zip: ['', Validators.required],
      apartment: ['', Validators.required],
      street: ['', Validators.required]
    });
  }

  private _getCountries() {
    this.countries = this.usersService.getCountries();
  }

  backToCart() {
    this.router.navigate(['/cart']);
  }

  placeOrder() {
    this.isSubmitted = true;  

    if (this.checkoutFormGroup.invalid) {
      return;
    }

     const order: Order = {
      id : '',
      orderItems: this.orderItems,
      shippingAddress1: this.checkoutForm.street.value,
      shippingAddress2: this.checkoutForm.apartment.value,
      city: this.checkoutForm.city.value,
      zip: this.checkoutForm.zip.value,
      country: this.checkoutForm.country.value,
      status:  0,
      user: this.userId,
      phone: this.checkoutForm.phone.value,
      dateOrdered: `${Date.now()}`,
     }

     this.orderService.cacheOrderData(order);

     this.orderService.createCheckoutSession(this.orderItems).subscribe((error)=>{
      if(error){
        console.log('error in redirect to  payment ')
      }
    })

   
    }
  

  get checkoutForm() {
    return this.checkoutFormGroup.controls;
  }

  
}
