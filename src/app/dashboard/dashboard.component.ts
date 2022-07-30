import { Component, OnInit, } from '@angular/core';
import { FetchVehicleService } from './fetch-vehicle/fetch-vehicle.service';

declare var google: any;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: [FetchVehicleService],
})
export class DashboardComponent implements OnInit {

  constructor(private fetchService: FetchVehicleService) {}

  selected: number = 0;
  veiculos: any ;
  veiculoData: any;
  chartData: any;

  ngOnInit(): void {
    this.getVehicles();
    // this.loadVehicleData();
    this.googleChartsInit();
  }

  updateConnectedChartData (){
    return [['Conectados',this.veiculos[this.selected].connected],['Desconectados',this.veiculos[this.selected].totalSales]]
  }

  updateUpdatedChartData (){
    return [['Atualizados',this.veiculos[this.selected].softwareUpdates],['Desatualizados',this.veiculos[this.selected].totalSales]]
  }

  googleChartsInit():void{
    if(typeof(google) !== 'undefined'){
      google.charts.load('current',{'packages':['corechart']});
      setTimeout(() => {
        google.charts.setOnLoadCallback(this.displayCharts());
      }, 600)
    }
  }

  displayCharts(): void{
    this.displayDoughnutChartConnected();
    this.displayDoughnutChartUpdated();
  }

  displayDoughnutChartConnected(){
    const el = document.getElementById('doughnut-chart-connected');
    const chart = new google.visualization.PieChart(el); //
    chart.draw(this.getDataTableConnected(), this.getOptionsConneted());
    const option = this.getOptionsConneted();
    option['pieHole'] = 0.30;
    chart.draw(this.getDataTableConnected(), option);
  }

  displayDoughnutChartUpdated(){
    const el = document.getElementById('doughnut-chart-updated');
    const chart = new google.visualization.PieChart(el); //
    chart.draw(this.getDataTableUpdated(), this.getOptionsUpdated());
    const option = this.getOptionsUpdated();
    option['pieHole'] = 0.30;
    chart.draw(this.getDataTableUpdated(), option);
  }

  getDataTableConnected():any{
    const tData = new google.visualization.DataTable();
    tData.addColumn('string','label')
    tData.addColumn('number','value')
    tData.addRows(this.updateConnectedChartData());
    return tData;
  }

  getDataTableUpdated():any{
    const tData = new google.visualization.DataTable();
    tData.addColumn('string','label')
    tData.addColumn('number','value')
    tData.addRows(this.updateUpdatedChartData());
    return tData;
  }

  getOptionsConneted():any{
    return{
      'title': 'Veículos Conectados',
      'width': 245,
      'height': 250,
      'colors':['#133A7C','#dbdbdc'],
      'legend':'none',
      'fontSize': 13
    }
  }

  getOptionsUpdated():any{
    return{
      'title': 'Update Software',
      'width': 245,
      'height': 250,
      'colors':['#133A7C','#dbdbdc'],
      'legend':'none',
      'fontSize': 13
    }
  }

  getVehicleData() {
    this.fetchService.fetchVehicleData().subscribe((res) => {
      return this.veiculoData = res.vehicleData;
    });
  }

  getVehicles() {
    this.fetchService.fetchVehicles().subscribe((res) => {
      this.veiculos = res;
    });
  }

  // ======================================================================================== //

  vin: string = '';

  data = {
    odometer: '',
    fuelLevel: '',
    status: '',
    lat: '',
    long: '',
  };

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
