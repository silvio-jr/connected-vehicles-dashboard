import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TokenService } from 'src/app/auth/token.service';

@Injectable({
  providedIn: 'root',
})
export class FordApiService {
  constructor(private http: HttpClient, private tokenService: TokenService)
  {}

  fetchVehicleData(): Observable<any> {
    const token = this.tokenService.returnToken();
    const headers = new HttpHeaders().append('x-access-token', token)
    return this.http.get('http://localhost:3000/vehicleData',{
      headers
    });
  }

  fetchVehicles(): Observable<any> {
    const token = this.tokenService.returnToken();
    const headers = new HttpHeaders().append('x-access-token', token)
    return this.http.get('http://localhost:3000/vehicle', {
      headers
    });
  }

  sendVehicleData(body: any): Observable<any>{
    const token = this.tokenService.returnToken();
    const headers = new HttpHeaders().append('x-access-token', token)
    return this.http.post('http://localhost:3000/vehicleData', body, {headers})
  }

  editVehicleData(body: any, id: string): Observable<any>{
    const token = this.tokenService.returnToken();
    const headers = new HttpHeaders().append('x-access-token', token)
    return this.http.patch('http://localhost:3000/vehicleData/' + id, body, {headers})
  }

  deleteVehicleData(id: string): Observable<any>{
    const token = this.tokenService.returnToken();
    const headers = new HttpHeaders().append('x-access-token', token)
    return this.http.delete ('http://localhost:3000/vehicleData/' + id, {headers})
  }
}
