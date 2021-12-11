import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from  '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/product';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

 apiURLProduct = environment.apiUrl+'products';

  constructor(private http: HttpClient) {}

    getProducts(categoriesFilter?: string[]): Observable<Product[]> {
      let params = new HttpParams();
      
     if (categoriesFilter) {
        params = params.append('categories', categoriesFilter.join(','))
      }
      return this.http.get<Product[]>(this.apiURLProduct,{params:params})
    
    }
    
     getProduct(productId: string): Observable<Product> {
       return this.http.get<Product>(`${this.apiURLProduct}/${productId}`)
    
     }

     createProduct(product: FormData): Observable<Product> {
       return this.http.post<Product>(this.apiURLProduct,product);
     }

     updateProduct(productData: FormData, productId: string): Observable<Product> {
       return this.http.put<Product>(`${this.apiURLProduct}/${productId}`,productData);
     }


     deleteProduct(productId: string): Observable<any> {
          return this.http.delete<any>(`${this.apiURLProduct}/${productId}`);
     }    


     getFeaturedProducts(count:number) : Observable<Product[]> {
      return this.http.get<Product[]>(`${this.apiURLProduct}/get/featured/${count}`);
     }

   }

