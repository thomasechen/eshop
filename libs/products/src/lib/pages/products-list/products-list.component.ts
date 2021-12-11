import { Component, OnInit } from '@angular/core';
import { CategoriesService } from '../../services/categories.service';
import { Product } from '../../models/product';
import { ProductsService } from '../../services/products.service';
import { Category } from '../../models/categories';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'products-list',
  templateUrl: './products-list.component.html',
})
export class ProductsListComponent implements OnInit {

   products: Product[] = [];
   categories: Category[] =[];
   isCategoryPage!: boolean;
  constructor(private prodService : ProductsService,
              private categoryService : CategoriesService,
              private route : ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe((params)=>{
      
      this.isCategoryPage = true;
      params.categoryid ? this._getProducts([params.categoryid]) : this._getProducts();
      params.categoryid ? this.isCategoryPage = true : this.isCategoryPage = false;
    })
    //this._getProducts();
    this._getCategories();
  }


  private _getProducts(categoriesFilter?: string[]){
    this.prodService.getProducts(categoriesFilter).subscribe(resProducts=>{
    this.products = resProducts;
    })
  }

  private _getCategories(){
    this.categoryService.getCategories().subscribe(resCategoreis=>{
      this.categories = resCategoreis;
    })
  }

  categoryFilter(){
    let selectedCategories:string[] = [];
    selectedCategories = this.categories.filter((category)=> category.checked).map((category)=>category.id)
    this._getProducts(selectedCategories);
 }

}
