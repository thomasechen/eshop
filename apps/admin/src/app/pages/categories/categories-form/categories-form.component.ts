import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CategoriesService, Category } from '@holystone/products';
import { MessageService } from 'primeng/api';
import { timer } from 'rxjs';

@Component({
  selector: 'admin-categories-form',
  templateUrl: './categories-form.component.html',
  styles: [
  ]
})
export class CategoriesFormComponent implements OnInit {

  form!: FormGroup ;
  isSubmitted = false ;
  editmode = false;
  currentCategoryID = '';  

  constructor(private location:Location,private messageService: MessageService,private formBuilder: FormBuilder, private categoryService: CategoriesService,private route:ActivatedRoute) { }

  ngOnInit(): void {
   this.form = this.formBuilder.group({
     name: ['',Validators.required],
     icon: ['',Validators.required],
     color: ['#fff',Validators.required],
   })

   this._checkeditingmode();
  }

  onCancel() {
          this.location.back();
    }

  onSubmit() {

    this.isSubmitted = true;
    if (this.form.invalid) {
      return;
    }

    const category: Category = {
      id:   this.currentCategoryID,
      name: this.categoryForm.name.value,
      icon: this.categoryForm.icon.value,
      color: this.categoryForm.color.value 
    }

    if(this.editmode){
      this._updateCategory(category);
    } else{
      this._addCategory(category);
    }




    console.log(this.categoryForm.name.value);
    console.log(this.categoryForm.icon.value);
  }

 get categoryForm() {
   return this.form.controls;
 }

 private _updateCategory(category: Category) { 
  this.categoryService.updateCategory(category).subscribe((category: Category)=>{
    this.messageService.add({severity:'success', summary:'Success',detail:`Category ${category.name} is updated`});

    timer(2000).toPromise().then(()=>{
      this.location.back();
    })
 },
 (error)=>{
  this.messageService.add({severity:'error', summary:'Error', detail:error});
 });

 }

 private _addCategory(category: Category) { 
  this.categoryService.createCategory(category).subscribe((category: Category)=>{
    this.messageService.add({severity:'success', summary:'Success', detail:`Category ${category.name} is created`});

    timer(2000).toPromise().then(()=>{
      this.location.back();
    })
 },
 (error)=>{
  this.messageService.add({severity:'error', summary:'Error', detail:error});
 });

}


 private _checkeditingmode() {
    this.route.params.subscribe((params)=>{
       if(params.id){
        this.editmode = true;
        this.currentCategoryID = params.id;
        this.categoryService.getCategory(params.id).subscribe((category)=>{
          this.categoryForm.name.setValue(category.name);
          this.categoryForm.icon.setValue(category.icon);
          this.categoryForm.color.setValue(category.color);
        })
       } 
    });
 }

}
