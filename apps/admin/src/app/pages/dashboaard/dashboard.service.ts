/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'; 

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http: HttpClient) { }

  getOrderCounts():Observable<number> {
    
   // console.log(this.http.get<number>('http://localhost:3000/api/v1/order/get/count'));
     
    return this.http.get<number>('http://localhost:3000/api/v1/order/get/count').pipe(map((result: any) => { return result.orderCounts}));
  }

  getProductCounts():Observable<number> {
    
    // console.log(this.http.get<number>('http://localhost:3000/api/v1/order/get/count'));
      
     return this.http.get<number>('http://localhost:3000/api/v1/products/get/count').pipe(map((result: any) => { return result.productCount}));
   }
 

   getUserCounts():Observable<number> {
    
    // console.log(this.http.get<number>('http://localhost:3000/api/v1/order/get/count'));
      
     return this.http.get<number>('http://localhost:3000/api/v1/user/get/count').pipe(map((result: any) => { return result.userCount}));
   }

   getTotalSales():Observable<number> {
    
    // console.log(this.http.get<number>('http://localhost:3000/api/v1/order/get/count'));
      
     return this.http.get<number>('http://localhost:3000/api/v1/order/get/totalsales').pipe(map((result: any) => { return result.totalsales}));
   }


}
