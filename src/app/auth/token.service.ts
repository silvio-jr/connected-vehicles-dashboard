import { Injectable } from '@angular/core';

const KEY = 'token'

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() { }

  returnToken(){
    return localStorage.getItem(KEY) ?? '';
  }

  saveToken(token: string ){
    localStorage.setItem(KEY, token);
  }

  removeToken(){
    localStorage.removeItem(KEY);
  }

  haveToken(){
    return !!this.returnToken();
  }
}
