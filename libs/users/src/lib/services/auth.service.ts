import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/users';
import { Observable } from 'rxjs';
import { LocalstorageService } from './localstorage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private token:LocalstorageService, private router :Router) { }

  login(email: string, password:string): Observable<User> {
    return this.http.post<User>('http://localhost:3000/api/v1/user/login',{email: email, password:password});
  }

  logout() {
    this.token.removeToken();
    this.router.navigate(['/login']);
  }

}
