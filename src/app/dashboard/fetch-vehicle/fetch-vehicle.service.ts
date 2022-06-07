import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Veiculo } from './vehicle.model';

@Injectable({
  providedIn: 'root'
})
export class FetchVehicleService {

  constructor(private httpClient: HttpClient) { }

  fetchVehicle(){
    this.httpClient
    .get <Veiculo[]> ('http://localhost:3000/vehicleData')
    .subscribe(vehicles => console.log(vehicles))
  }
}
