import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CartService } from './services/cart.service';
import { CartIconComponent } from './components/cart-icon/cart-icon.component';
import { BadgeModule } from 'primeng/badge';
import { CartPageComponent } from './pages/cart-page/cart-page.component';
import { ButtonModule } from 'primeng/button';
import { InputNumberModule } from 'primeng/inputnumber';
import { OrderSummaryComponent } from './components/order-summary/order-summary.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CheckoutPageComponent } from './pages/check/checkout-page.component';
import { InputMaskModule } from 'primeng/inputmask';
import { DropdownModule } from 'primeng/dropdown';
import { CardModule } from 'primeng/card';
import { ThankYouComponent } from './pages/thank-you/thank-you.component';
import { AuthGuardService } from '@holystone/users';

//export const ordersRoutes: Route[] = [];

const routes:Routes = [
    {
        path : 'cart' , component: CartPageComponent

    },
    {
        path : 'checkout',
          canActivate: [AuthGuardService],
          component: CheckoutPageComponent    
        
    },
    {
        path : 'success' , component: ThankYouComponent    
        
    }
]

@NgModule({
    imports: [CardModule,CommonModule,RouterModule.forChild(routes),BadgeModule,ButtonModule,InputNumberModule,FormsModule,InputMaskModule,ReactiveFormsModule,DropdownModule],
    declarations: [
      CartIconComponent,
      CartPageComponent,
      OrderSummaryComponent,
      CheckoutPageComponent,
      ThankYouComponent
    ],
    exports: [CartIconComponent, CartPageComponent]
})
export class OrdersModule {
    constructor(cartService: CartService) {
        cartService.initCartLocalStorage();
    }
}
