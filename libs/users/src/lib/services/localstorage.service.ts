import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalstorageService {

  constructor() { }

  setToken(data: any){
    localStorage.setItem('token',data)
  }

  getToken() : string|null {
    return localStorage.getItem('token')
  }

  removeToken() {
     localStorage.removeItem('token')
  }


 getUserIdFromToken(){
  const token = this.getToken();
  if(token) {
    const tokenDecode = JSON.parse(atob(token.split('.')[1])); 
     if(tokenDecode){
      return tokenDecode.userId;
     } else{
      return null;
     }
  } else{
    return null;
  }
 }

 isValidToken(){
   const token = this.getToken();
   if(token) {
     const tokenDecode = JSON.parse(atob(token.split('.')[1])); 
     return !this._tokenExpired(tokenDecode.exp)
   } else{
     return false;
   }
 }

 private _tokenExpired(expriation: number) : boolean{
  return Math.floor(new Date().getTime() /1000) >= expriation;
}

}
