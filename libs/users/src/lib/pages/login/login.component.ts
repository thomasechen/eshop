import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { LocalstorageService } from '../../services/localstorage.service';

@Component({
  selector: 'users-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent implements OnInit {

  loginFormGroup!: FormGroup;
  isSubmiitted = false;
  AuthError = false;
  AuthMessage= "Email or Password are incorrect";
  
  constructor(private formBuilder: FormBuilder,
              private auth: AuthService,
              private localStroageService: LocalstorageService,
              private router: Router) { }

  ngOnInit(): void {
    this._initForm();

  }

  onSubmitted(){
    this.isSubmiitted = true;

   if( this.loginFormGroup.invalid) {return}

    this.auth.login( this.loginForm.email.value, this.loginForm.password.value ).subscribe( (results)=>{
      this.AuthMessage = "";
      this.localStroageService.setToken(results.token);
      this.router.navigate(['/']);
    },(error: HttpErrorResponse)=>{
        this.AuthError = true;
        if(error.status !== 400){
          this.AuthMessage = "Error in the Server, plaease try again later";
        }
    })
  }


 private _initForm(){
  this.loginFormGroup = this.formBuilder.group({
    email: ['',[Validators.required,Validators.email]],
    password : ['',[Validators.required]]
  })
 }

 get loginForm(){
   return this.loginFormGroup.controls;
 }


}
