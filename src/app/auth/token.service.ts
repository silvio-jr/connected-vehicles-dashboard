import { Injectable } from '@angular/core';
import {JwtHelperService} from '@auth0/angular-jwt';

const KEY = 'token'

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor(private jwtHelper: JwtHelperService) { }

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

  tokenExpired(){
    const token:string = localStorage.getItem(KEY) ?? ''
    return this.jwtHelper.isTokenExpired(token)
  }
}
