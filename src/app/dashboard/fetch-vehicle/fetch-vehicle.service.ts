import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TokenService } from 'src/app/auth/token.service';

@Injectable({
  providedIn: 'root',
})
export class FetchVehicleService {
  constructor(private httpClient: HttpClient, private tokenService: TokenService)
  {}

  fetchVehicleData(): Observable<any> {
    const token = this.tokenService.returnToken();
    const headers = new HttpHeaders().append('x-access-token', token)
    return this.httpClient.get('http://localhost:3000/vehicleData',{
      headers
    });
  }

  fetchVehicles(): Observable<any> {
    const token = this.tokenService.returnToken();
    const headers = new HttpHeaders().append('x-access-token', token)
    return this.httpClient.get('http://localhost:3000/vehicle', {
      headers
    });
  }
}
