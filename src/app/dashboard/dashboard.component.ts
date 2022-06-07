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
  }

  displayVehicleData(){
    this.fetchService.fetchVehicle()
  }
}
