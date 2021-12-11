/* eslint-disable @typescript-eslint/no-explicit-any */
import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { User, UsersService } from '@holystone/users';
import { MessageService } from 'primeng/api';
import { timer } from 'rxjs';




@Component({
  selector: 'admin-user-form',
  templateUrl: './user-form.component.html',
 })
export class UserFormComponent implements OnInit {

  checked = false;
  editmode = false;
  isSubmitted = false;
  form!: FormGroup; 
  currentUserID!: string ;
  countries: any[] = [] ;

  constructor(private formBuilder: FormBuilder,
              private route:       ActivatedRoute,
              private usersService : UsersService,
              private location: Location,
              private messageService: MessageService ) { }

  ngOnInit(): void {
    this._initForm();
    this._getcountries();
    this._checkeditmode();
  }



  onSubmit() { 
    this.isSubmitted = true;
    if(this.form.invalid) {
      return;
    }


    const user: User = {
      id:   this.currentUserID,
      name: this.userForm.name.value,
      email: this.userForm.email.value,
      phone: this.userForm.phone.value,
      password: this.userForm.password.value,
      street: this.userForm.street.value,
      apartment: this.userForm.apartment.value,
      city: this.userForm.city.value,
      country: this.userForm.country.value,
      isAdmin: this.userForm.isAdmin.value,
      zip: this.userForm.zip.value,
    }
  
     if (this.editmode) {
     this._updateUser(user);}
     else{
     this._addUser(user); 
     }

  };

  onCancel() {
    this.location.back(); 
   };


   get userForm() {
    return this.form.controls;
  }

  private _getcountries(){
    

    this.countries = this.usersService.getCountries();

    // this.countries = Object.entries(countriiesLib.getNames('en',{select: 'official'})).map((entry)=>{
    //   return{
    //     id:entry[0],
    //     name:entry[1]
    //   }
    // });
  }

  private _updateUser(user: User) {
    this.usersService.updateUser(this.currentUserID,user).subscribe((user: User)=>{
      this.messageService.add({severity:'success', summary:'Success',detail:`User ${user.name} is updated`});
  
      timer(2000).toPromise().then(()=>{
        this.location.back();
      })
   },
   (error)=>{
    this.messageService.add({severity:'error', summary:'Error', detail:error});
   });

  }

  private _addUser(user: User) {
    this.usersService.createUser(user).subscribe((user: User)=>{
      this.messageService.add({severity:'success', summary:'Success',detail:`User ${user.name} is updated`});
  
      timer(2000).toPromise().then(()=>{
        this.location.back();
      })
   },
   (error)=>{
    this.messageService.add({severity:'error', summary:'Error', detail:error});
   });

  }

  private _checkeditmode() {
    this.route.params.subscribe( (params)=>{
      if (params.id){
        this.editmode = true;
        this.currentUserID = params.id;
        this.usersService.getUser(params.id).subscribe((user)=>{
          this.userForm.name.setValue(user.name);
          this.userForm.email.setValue(user.email);
          this.userForm.phone.setValue(user.phone);
          this.userForm.street.setValue(user.street);
          this.userForm.apartment.setValue(user.apartment);
          this.userForm.city.setValue(user.city);
          this.userForm.zip.setValue(user.zip);
          this.userForm.country.setValue(user.country);
          this.userForm.isAdmin.setValue(user.isAdmin);

          this.userForm.password.setValidators([]);
          this.userForm.password.updateValueAndValidity();
        })}})}



 private _initForm() {
  this.form = this.formBuilder.group({
    name: ['',Validators.required],
    email: ['',[Validators.required,Validators.email]],
    password: ['',Validators.required],
    phone: ['',Validators.required],
    isAdmin: [false],
    street: [''],
    apartment: [''],
    city: [''],
    country: [''],
    zip: ['']
   });
 }

}
