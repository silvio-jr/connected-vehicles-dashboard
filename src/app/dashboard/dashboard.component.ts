import { Component, OnInit } from '@angular/core';
import { FetchVehicleService } from './fetch-vehicle/fetch-vehicle.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: [FetchVehicleService]
})
export class DashboardComponent implements OnInit {

  constructor(private fetchService:FetchVehicleService) { }

  ngOnInit(): void {
    this.loadVehicles()
    this.loadVehicleData()
  }

  veiculos:any
  veiculoData:any

  cars = [
    { id: 1, name: 'Ranger', address: '/assets/img/ranger.png' },
    { id: 2, name: 'Mustang', address: '/assets/img/mustang.png' },
    { id: 3, name: 'Territory', address: '/assets/img/territory.png' },
    { id: 4, name: 'Bronco Sport', address: '/assets/img/broncoSport.png' },
  ];

  selected: number = 1;

  loadVehicleData(){
    this.fetchService.fetchVehicleData().subscribe( (data) => {
      this.veiculoData = data.vehicleData
    })

  }

  loadVehicles(){
    this.fetchService.fetchVehicles().subscribe( (vehicles) => {
      this.veiculos = vehicles.vehicles
    })
    console.log(this.veiculos)
  }

}
