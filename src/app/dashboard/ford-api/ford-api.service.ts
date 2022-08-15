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

  SERVER_URL = 'http://localhost:3000/'

  //============================================= vehicle ==========================================//

  fetchVehicles(): Observable<any> {
    const token = this.tokenService.returnToken();
    const headers = new HttpHeaders().append('x-access-token', token)
    return this.http.get(this.SERVER_URL+'vehicle', {
      headers
    });
  }

  upload(formData:any): Observable<any>{
    const token = this.tokenService.returnToken();
    const headers = new HttpHeaders().append('x-access-token', token)
    return this.http.post(this.SERVER_URL+'vehicle/upload', formData, {headers})
  }

  sendVehicle(body: any): Observable<any>{
    const token = this.tokenService.returnToken();
    const headers = new HttpHeaders().append('x-access-token', token)
    return this.http.post(this.SERVER_URL+'vehicle', body, {headers})
  }

  //========================================= vehicle data =========================================//

  fetchVehicleData(): Observable<any> {
    const token = this.tokenService.returnToken();
    const headers = new HttpHeaders().append('x-access-token', token)
    return this.http.get(this.SERVER_URL+'vehicleData',{
      headers
    });
  }

  sendVehicleData(body: any): Observable<any>{
    const token = this.tokenService.returnToken();
    const headers = new HttpHeaders().append('x-access-token', token)
    return this.http.post(this.SERVER_URL+'vehicleData', body, {headers})
  }

  editVehicleData(body: any, id: string): Observable<any>{
    const token = this.tokenService.returnToken();
    const headers = new HttpHeaders().append('x-access-token', token)
    return this.http.patch(this.SERVER_URL+'vehicleData/' + id, body, {headers})
  }

  deleteVehicleData(id: string): Observable<any>{
    const token = this.tokenService.returnToken();
    const headers = new HttpHeaders().append('x-access-token', token)
    return this.http.delete (this.SERVER_URL+'vehicleData/' + id, {headers})
  }
}
