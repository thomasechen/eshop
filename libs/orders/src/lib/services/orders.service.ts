import { Injectable } from '@angular/core';
import { HttpClient } from  '@angular/common/http';
import { Observable } from 'rxjs';
import { Order } from '../models/orders';
import { OrderItem } from '../models/order-item';
import { switchMap } from 'rxjs/operators';
import { StripeService } from 'ngx-stripe';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  apiURLOrders = environment.apiUrl+'order';
  apiURLProducts = environment.apiUrl+'products';

  constructor(private http: HttpClient,private stripeService: StripeService) { }

  getOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(this.apiURLOrders)
  
  }
  getOrder(OrderId: string): Observable<Order> {
    return this.http.get<Order>(`${this.apiURLOrders}/${OrderId}`)
   
  }

  createOrder(Order: Order): Observable<Order> {
    return this.http.post<Order>(this.apiURLOrders,Order);
  }

  updateOrder(orderStatus: {status:string}, OrderId:string): Observable<Order> {
    return this.http.put<Order>(`${this.apiURLOrders}/${OrderId}`,orderStatus);
  }


  deleteOrder(OrderId: string): Observable<any> {
       return this.http.delete<any>(`${this.apiURLOrders}/${OrderId}`);
  }    

  getProduct(productId: string): Observable<any> {
    return this.http.get<any>(`${this.apiURLProducts}/${productId}`)
 
  }

  createCheckoutSession(orderItem: OrderItem[])  {
    return this.http.post(`${this.apiURLOrders}/create-checkout-session`,orderItem).pipe(
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
 