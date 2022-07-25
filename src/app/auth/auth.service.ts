import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Usuario } from './user.model';
import { UserService } from './user.service';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient: HttpClient, private userService: UserService) { }

  authenticate(username: string, password: string): Observable<HttpResponse<any>>{
    return this.httpClient.post<Usuario>('http://localhost:3000/login',
    {
       username,
       password,
    },
    { observe:'response',
      headers: new HttpHeaders().set('content-type','application/json')
    }
    )
    .pipe(
      tap((res)=>{
        // const authToken = res.headers.get('x-access-token') ?? '';
        const authToken = res.body?.token
        this.userService.salvaToken(authToken);
      }),
    )
  }
}
