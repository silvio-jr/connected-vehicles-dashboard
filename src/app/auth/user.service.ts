import { Injectable } from '@angular/core';
import { TokenService } from './token.service';
import { Usuario } from './user.model';
import jwt_decode from 'jwt-decode'
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private usuarioSubject = new BehaviorSubject<Usuario>({})

  constructor(private tokenService: TokenService) {
    if(this.tokenService.haveToken()){
      this.decodificaJWT();
    }
   }

  private decodificaJWT(){
    const token = this.tokenService.returnToken();
    const usuario = jwt_decode(token) as Usuario;
    this.usuarioSubject.next(usuario);
  }

  retornaUsuario() {
    return this.usuarioSubject.asObservable();
  }

  salvaToken(token:any){
    this.tokenService.saveToken(token);
    this.decodificaJWT();
  }

  logout(){
    this.tokenService.removeToken();
    this.usuarioSubject.next({});
  }

  estaLogado(){
    return this.tokenService.haveToken() && !this.tokenService.tokenExpired();
    // return this.tokenService.haveToken();
  }
}
