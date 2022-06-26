import { HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FetchVehicleService {
  constructor(private http: HttpClient) //private tokenService: TokenService
  {}

  fetchVehicleData(): Observable<any> {
    return this.http.get('http://localhost:3000/vehicleData');
  }

  fetchVehicles(): Observable<any> {
    return this.http.get('http://localhost:3000/vehicle');
  }
}
