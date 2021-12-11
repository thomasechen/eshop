import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from  '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http: HttpClient) {}
    
    getProducts(categoriesFilter?: string[]): Observable<Product[]> {
      let params = new HttpParams();
      
     if (categoriesFilter) {
        params = params.append('categories', categoriesFilter.join(','))
      }
      return this.http.get<Product[]>('http://localhost:3000/api/v1/products',{params:params})
    
    }
    
     getProduct(productId: string): Observable<Product> {
       return this.http.get<Product>(`http://localhost:3000/api/v1/products/${productId}`)
    
     }

     createProduct(product: FormData): Observable<Product> {
       return this.http.post<Product>('http://localhost:3000/api/v1/products',product);
     }

     updateProduct(productData: FormData, productId: string): Observable<Product> {
       return this.http.put<Product>(`http://localhost:3000/api/v1/products/${productId}`,productData);
     }


     deleteProduct(productId: string): Observable<any> {
          return this.http.delete<any>(`http://localhost:3000/api/v1/products/${productId}`);
     }    


     getFeaturedProducts(count:number) : Observable<Product[]> {
      return this.http.get<Product[]>(`http://localhost:3000/api/v1/products/get/featured/${count}`);
     }

   }

