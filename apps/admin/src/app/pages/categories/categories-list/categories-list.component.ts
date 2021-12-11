import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoriesService, Category } from '@holystone/products';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'admin-categories-list',
  templateUrl: './categories-list.component.html',

})
export class CategoriesListComponent implements OnInit {
  
  categories!: Category[];


  constructor(private messageService: MessageService,private categoryService: CategoriesService, private confirmationService: ConfirmationService,private router:Router) { }

  ngOnInit(): void {
//    this.categoryService.getCategories().subscribe(cats => {
//    this.categories = cats; 
//      })
    this._getCategories();
  }

 deleteCategory(CategoryId : string ) {

  this.confirmationService.confirm({
    message: 'Do you want to delete this category?',
    header: 'Delete Category',
    icon: 'pi pi-exclamation-triangle',
    accept: () => {
      this.categoryService.deleteCategory(CategoryId).subscribe( () =>{
        this._getCategories();
        this.messageService.add({severity:'success', summary:'Success', detail:'Category is deleted!'});
      },()=>{
        this.messageService.add({severity:'error', summary:'Error', detail:'Category is not deleted!'});
       } );
    },
   // reject: (type: any) => {}
});

 }


 updateCategory(CategoryId : string ) {
  this.router.navigateByUrl(`categories/form/${CategoryId}`) 
}


 private _getCategories() {
  this.categoryService.getCategories().subscribe(cats => {
     this.categories = cats; 
      })
}

}
