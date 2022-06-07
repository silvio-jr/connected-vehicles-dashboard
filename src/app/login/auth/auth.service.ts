import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuario } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient: HttpClient) { }

  login(userName: string, password: string){
    return this.httpClient.post<Usuario>('http://localhost:3000/user/login',
    {
      userName: userName,
      password: password
    }
    );
  }
}
