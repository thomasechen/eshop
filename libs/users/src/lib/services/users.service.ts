import { Injectable } from '@angular/core';
import { HttpClient } from  '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/users';
import * as countriesLib from 'i18n-iso-countries';
import { UsersFacade } from '../state/users.facade';
import { environment } from 'environments/environment';

declare const require: any;

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  apiURLUsers = environment.apiUrl + 'user';

  constructor(private http: HttpClient,
              private usersFacade: UsersFacade) {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    countriesLib.registerLocale(require("i18n-iso-countries/langs/en.json"));
  }
    
    getUsers(): Observable<User[]> {
      return this.http.get<User[]>(this.apiURLUsers)
    
    }
     getUser(userId: string): Observable<User> {
       return this.http.get<User>(`${this.apiURLUsers}/${userId}`);
         }

     createUser(user: User): Observable<User> {
       return this.http.post<User>(this.apiURLUsers,user);
     }

     updateUser(userId: string,user: User ): Observable<User> {
       return this.http.put<User>(`${this.apiURLUsers}/${userId}`,user);
     }


     deleteUser(userid: string): Observable<any> {
          return this.http.delete<any>(`${this.apiURLUsers}/${userid}`);
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

