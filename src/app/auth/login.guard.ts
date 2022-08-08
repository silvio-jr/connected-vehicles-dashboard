import { Injectable } from '@angular/core';
import { CanLoad, Route, Router, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanLoad {

  constructor(private usuarioService:UserService,private router:Router){}

  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    if(this.usuarioService.estaLogado() && this.getLocalStorage() === 'true'){
      this.router.navigate(['home']);
      return false
    }

    else if(this.usuarioService.estaLogado() && this.getLocalStorage() === 'false'){
      this.usuarioService.logout()
    }

    return true
  }

  getLocalStorage(){
    return localStorage.getItem('rememberMe')
  }

}
