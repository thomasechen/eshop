import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CategoriesService, Category, Product, ProductsService } from '@holystone/products';
import { MessageService } from 'primeng/api';
import { timer } from 'rxjs';


@Component({
  selector: 'admin-products-form',
  templateUrl: './products-form.component.html',
  styles: [
  ]
})
export class ProductsFormComponent implements OnInit {

  checked = false;
  editmode = false;
  isSubmitted = false;
  categories!: Category[] ;
  form!: FormGroup; 
  imageDisplay!: string | ArrayBuffer | null | undefined;
  currentProductID!: string ;

  constructor(private formBuilder: FormBuilder,
              private productsService: ProductsService,
              private messageService : MessageService,
              private location: Location,
              private categoriesService: CategoriesService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this._initForm();
    this._getCategories();
    this._checkEditMode();
  }


  get productForm() {
    return this.form.controls;
  }

 private _initForm() {
  this.form = this.formBuilder.group({
    name: ['',Validators.required],
    brand: ['',Validators.required],
    price: ['',Validators.required],
    category: ['',Validators.required],
    countInStock: ['',Validators.required],
    description: ['',Validators.required],
    richDescription: [''],
    image: ['',Validators.required],
    isFeatured: ['false']
   });
 }



onImageUpload(event) {
  const file = event.target.files[0];
  if (file) {
    this.form.patchValue({ image:file });
    this.form.get('image')?.updateValueAndValidity();
    const fileReader = new FileReader();
    fileReader.onload = () => {
      this.imageDisplay = fileReader.result 
    }
    fileReader.readAsDataURL(file);
  }
}
 onSubmit() {
  this.isSubmitted = true;
  if(this.form.invalid) {
    return;
  }

  const productFormData = new FormData();

  Object.keys(this.productForm).map((key)=>{
    productFormData.append(key,this.productForm[key].value);
  })

   if (this.editmode) {
   this._updateProduct(productFormData);}
   else{
   this._addProduct(productFormData); 
   }
   

 };
 
 onCancel() {
     this.location.back(); 
 }; 


 private _getCategories() {
  this.categoriesService.getCategories().subscribe( (categories)=>{
    this.categories = categories;
  })
}


private _updateProduct(productData: FormData){
  this.productsService.updateProduct(productData,this.currentProductID).subscribe((product: Product)=>{
    this.messageService.add({severity:'success', summary:'Success',detail:`Product ${product.name} is updated`});

    timer(2000).toPromise().then(()=>{
      this.location.back();
    })
 },
 (error)=>{
  this.messageService.add({severity:'error', summary:'Error', detail:error});
 });
}


private _checkEditMode() {
  this.route.params.subscribe((params)=>{
     if(params.id){
      this.editmode = true;
      this.currentProductID = params.id;
      this.productsService.getProduct(params.id).subscribe((product)=>{
        this.productForm.name.setValue(product.name);
        this.productForm.category.setValue(product.category);
        this.productForm.brand.setValue(product.brand);
        this.productForm.price.setValue(product.price);
        this.productForm.countInStock.setValue(product.countInStock);
        this.productForm.isFeatured.setValue(product.isFeatured);
        this.productForm.description.setValue(product.description);
        this.productForm.richDescription.setValue(product.richDescription);
        this.imageDisplay = product.image;
        this.productForm.image.setValidators([]);
        this.productForm.image.updateValueAndValidity();

      })
     } 
  });
}

 private _addProduct(productData: FormData){
   //console.log(productData)
    this.productsService.createProduct(productData).subscribe((product: Product)=>{
      this.messageService.add({severity:'success', summary:'Success', detail:`Product ${product.name} is created`});
       timer(2000).toPromise().then(()=>{
         this.location.back();
       })      
    },
        (error)=>{
     this.messageService.add({severity:'error', summary:'Error', detail:error});
     }
    );





 }


}
