import { Injectable } from '@angular/core';
import { HttpClient } from  '@angular/common/http';
import { Observable } from 'rxjs';
import { Order } from '../models/orders';
import { OrderItem } from '../models/order-item';
import { switchMap } from 'rxjs/operators';
import { StripeService } from 'ngx-stripe';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor(private http: HttpClient,private stripeService: StripeService) { }

  getOrders(): Observable<Order[]> {
    return this.http.get<Order[]>('http://localhost:3000/api/v1/order')
  
  }
  getOrder(OrderId: string): Observable<Order> {
    return this.http.get<Order>(`http://localhost:3000/api/v1/order/${OrderId}`)
   
  }

  createOrder(Order: Order): Observable<Order> {
    return this.http.post<Order>('http://localhost:3000/api/v1/order',Order);
  }

  updateOrder(orderStatus: {status:string}, OrderId:string): Observable<Order> {
    return this.http.put<Order>(`http://localhost:3000/api/v1/order/${OrderId}`,orderStatus);
  }


  deleteOrder(OrderId: string): Observable<any> {
       return this.http.delete<any>(`http://localhost:3000/api/v1/order/${OrderId}`);
  }    

  getProduct(productId: string): Observable<any> {
    return this.http.get<any>(`http://localhost:3000/api/v1/products/${productId}`)
 
  }

  createCheckoutSession(orderItem: OrderItem[])  {
    return this.http.post(`http://localhost:3000/api/v1/order/create-checkout-session`,orderItem).pipe(
      switchMap(( session: any ) => {
      return this.stripeService.redirectToCheckout({sessionId : session.id})
    }));
  }

  
  cacheOrderData(order:Order){
    localStorage.setItem('orderdata',JSON.stringify(order));
  }

 getCachedOrderData(): Order {
    return JSON.parse(localStorage.getItem('orderdata')||'{}');
 }

 removeCachedOrderData(){
   localStorage.removeItem('orderdataq')
 }

}
 