import { Component, OnInit } from '@angular/core';
import { FetchVehicleService } from './fetch-vehicle/fetch-vehicle.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: [FetchVehicleService],
})
export class DashboardComponent implements OnInit {
  constructor(private fetchService: FetchVehicleService) {}

  ngOnInit(): void {
    this.loadVehicles();
    this.loadVehicleData();
  }

  data = {
    odometer: '',
    fuelLevel: '',
    status: '',
    lat: '',
    long: '',
  };

  vin: string = '';

  veiculos: any;
  veiculoData: any;

  cars = [
    { id: 1, name: 'Ranger', address: '/assets/img/ranger.png' },
    { id: 2, name: 'Mustang', address: '/assets/img/mustang.png' },
    { id: 3, name: 'Territory', address: '/assets/img/territory.png' },
    { id: 4, name: 'Bronco Sport', address: '/assets/img/broncoSport.png' },
  ];

  selected: number = 1;

  loadVehicleData() {
    this.fetchService.fetchVehicleData().subscribe((data) => {
      this.veiculoData = data.vehicleData;
    });
  }

  loadVehicles() {
    this.fetchService.fetchVehicles().subscribe((vehicles) => {
      this.veiculos = vehicles.vehicles;
    });
  }

  searchVehicleData() {
    let changed: Boolean = false;

    this.veiculoData.forEach((el: any) => {
      if (el.vin == this.vin) {
        this.data.odometer = el['odometer'];
        this.data.fuelLevel = el['fuelLevel'];
        this.data.status = el['status'];
        this.data.lat = el['lat'];
        this.data.long = el['long'];
        changed = true;
      }
    });

    if (!changed) {
      this.data.odometer = '';
      this.data.fuelLevel = '';
      this.data.status = '';
      this.data.lat = '';
      this.data.long = '';
    }
  }
}
