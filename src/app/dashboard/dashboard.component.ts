import {AfterViewInit, Component, ElementRef, OnInit, ViewChild,} from '@angular/core';
import { FetchVehicleService } from './fetch-vehicle/fetch-vehicle.service';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: [FetchVehicleService],
})
export class DashboardComponent implements OnInit, AfterViewInit {
  @ViewChild('connectedVehiclesCanvas')
  private connectedVehiclesCanvas!: ElementRef;

  constructor(private fetchService: FetchVehicleService) {}

  doughnutChart: any;
  selected: number = 0;
  veiculos: any;

  ngAfterViewInit(): void {
    this.doughnutChartBrowser([
      this.veiculos[this.selected].totalSales,
      this.veiculos[this.selected].connected,
    ]);
  }

  doughnutChartBrowser(data: number[]): void {
    this.doughnutChart = new Chart(this.connectedVehiclesCanvas.nativeElement, {
      type: 'doughnut',
      data: {
        // labels: ['Total de Vendas','Conectados'],
        datasets: [
          {
            label: 'Connected vehicle data',
            data: data,
            backgroundColor: ['rgb(255, 99, 132)', 'rgb(54, 162, 235)'],
            hoverOffset: 4,
          },
        ],
      },
      options: {
        // responsive: true,
        plugins: {
          title:{
            display: true,
            text: 'Conectados'
          }
        }
      }
    });
  }

  chartDataUpdate(newData: number[]) {
    this.doughnutChart.data.datasets.forEach((el:any) => {
      el.data.push(newData);
    });
    this.doughnutChart.update();
  }

  removeData() {
    this.doughnutChart.data.datasets.forEach((dataset:any) => {
        dataset.data.pop();
    });
    this.doughnutChart.update();
}


  ngOnInit(): void {
    this.getVehicles();
    // this.loadVehicleData();
  }

  veiculoData: any;

  vin: string = '';

  data = {
    odometer: '',
    fuelLevel: '',
    status: '',
    lat: '',
    long: '',
  };

  getVehicleData() {
    this.fetchService.fetchVehicleData().subscribe((res) => {
      return (this.veiculoData = res.vehicleData);
    });
  }

  getVehicles() {
    this.fetchService.fetchVehicles().subscribe((res) => {
      this.veiculos = res;
    });
  }

  searchVehicleData() {
    let changed: Boolean = false;

    this.veiculoData.forEach((el: any) => {
      if (el.vin == this.vin) {
        this.data.odometer = el['odometer'];
        this.data.fuelLevel = el['fuelLevel'];
        this.data.status = el['status'];
        this.data.lat = el['latitude'];
        this.data.long = el['longitude'];
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
