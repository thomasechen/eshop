import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product, ProductsService } from '@holystone/products';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'admin-products-list',
  templateUrl: './products-list.component.html'

})
export class ProductsListComponent implements OnInit {

  products!:  Product[];
  constructor( private productsService: ProductsService,
               private router: Router ,
               private confirmationService: ConfirmationService,
               private messageService: MessageService) { }

  ngOnInit(): void {
    this._getProducts();
  }
 
  
  private _getProducts() {
    this.productsService.getProducts().subscribe( (products) => {
      this.products = products; 
       }) 
  }


  updateProduct(productid : string) {
      this.router.navigateByUrl(`products/form/${productid}`);
  }

  deleteProduct(productid : string) {
    this.confirmationService.confirm({
      message: 'Do you want to delete this product?',
      header: 'Delete Product',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.productsService.deleteProduct(productid).subscribe( () =>{
          this._getProducts();
          this.messageService.add({severity:'success', summary:'Success', detail:'Product is deleted!'});
        },()=>{
          this.messageService.add({severity:'error', summary:'Error', detail:'Product is not deleted!'});
         } );
      },
     // reject: (type: any) => {}
  });
}


}
