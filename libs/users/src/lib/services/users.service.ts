import { Injectable } from '@angular/core';
import { HttpClient } from  '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/users';
import * as countriesLib from 'i18n-iso-countries';
import { UsersFacade } from '../state/users.facade';

declare const require: any;

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient,
              private usersFacade: UsersFacade) {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    countriesLib.registerLocale(require("i18n-iso-countries/langs/en.json"));
  }
    
    getUsers(): Observable<User[]> {
      return this.http.get<User[]>('http://localhost:3000/api/v1/user')
    
    }
     getUser(userId: string): Observable<User> {
       return this.http.get<User>(`http://localhost:3000/api/v1/user/${userId}`);
         }

     createUser(user: User): Observable<User> {
       return this.http.post<User>('http://localhost:3000/api/v1/user',user);
     }

     updateUser(userId: string,user: User ): Observable<User> {
       return this.http.put<User>(`http://localhost:3000/api/v1/user/${userId}`,user);
     }


     deleteUser(userid: string): Observable<any> {
          return this.http.delete<any>(`http://localhost:3000/api/v1/user/${userid}`);
     }    

     getCountries(): { id: string; name: string }[] {
      
      return Object.entries(countriesLib.getNames('en', { select: 'official' })).map((entry) => {
        return {
          id: entry[0],
          name: entry[1]
        };
      });
    }

  
 getCountry(countryKey: string): string {
  return countriesLib.getName(countryKey, 'en');
}

  initAppSession(){
    this.usersFacade.buildUserSession();
  }


  observeCurrentUser(){
    return this.usersFacade.currentUser$;
  }

  isCurrentUserAuth(){
    return this.usersFacade.isAuthenticated$;
  }


   }

