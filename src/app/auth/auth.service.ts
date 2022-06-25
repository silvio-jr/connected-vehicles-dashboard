import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Usuario } from './user.model';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  constructor(private httpClient: HttpClient, private usuarioService: UserService) { }

  authenticate(username: string, password: string): Observable<HttpResponse<any>>{
    return this.httpClient.post<Usuario>('http://localhost:3000/user/login',
    {
      userName: username,
      password: password,
    },
    { observe:'response' }
    ).pipe(
      tap((res)=>{
        const authToken = res.headers.get('x-access-token') ?? '';
        this.usuarioService.salvaToken(authToken);
      })
    )
  }


}
