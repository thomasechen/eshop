import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/users';
import { Observable } from 'rxjs';
import { LocalstorageService } from './localstorage.service';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiURLUsers = environment.apiUrl+'user';

  constructor(private http: HttpClient, private token:LocalstorageService, private router :Router) { }

  login(email: string, password:string): Observable<User> {
    return this.http.post<User>(`${this.apiURLUsers}/login`,{email: email, password:password});
  }

  logout() {
    this.token.removeToken();
    this.router.navigate(['/login']);
  }

}
