import { Component, OnInit } from '@angular/core';
import { FordApiService } from './ford-api/ford-api.service';
import { FormBuilder, FormGroup } from '@angular/forms';


declare var google: any;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: [FordApiService],
})
export class DashboardComponent implements OnInit {
  constructor(private fordApi: FordApiService, private formBuilder: FormBuilder,) {}

  uploadForm: FormGroup;
  selected: number = 0;
  veiculos: any;
  veiculoData: any;

  ngOnInit(): void {
    this.uploadForm = this.formBuilder.group({
      profile: ['']
    });
    this.getVehicles();
    this.getVehicleData();
    this.googleChartsInit();
  }

  updateConnectedChartData() {
    return [
      ['Conectados', this.veiculos[this.selected].connected],
      ['Desconectados', this.veiculos[this.selected].totalSales],
    ];
  }

  updateUpdatedChartData() {
    return [
      ['Atualizados', this.veiculos[this.selected].softwareUpdates],
      ['Desatualizados', this.veiculos[this.selected].totalSales],
    ];
  }

  googleChartsInit(): void {
    if (typeof google !== 'undefined') {
      google.charts.load('current', { packages: ['corechart'] });
      setTimeout(() => {
        google.charts.setOnLoadCallback(this.displayCharts());
      }, 700);
    }
  }

  displayCharts(): void {
    this.displayDoughnutChartConnected();
    this.displayDoughnutChartUpdated();
  }

  displayDoughnutChartConnected() {
    const el = document.getElementById('doughnut-chart-connected');
    const chart = new google.visualization.PieChart(el); //
    chart.draw(this.getDataTableConnected(), this.getOptionsConneted());
    const option = this.getOptionsConneted();
    option['pieHole'] = 0.3;
    chart.draw(this.getDataTableConnected(), option);
  }

  displayDoughnutChartUpdated() {
    const el = document.getElementById('doughnut-chart-updated');
    const chart = new google.visualization.PieChart(el); //
    chart.draw(this.getDataTableUpdated(), this.getOptionsUpdated());
    const option = this.getOptionsUpdated();
    option['pieHole'] = 0.3;
    chart.draw(this.getDataTableUpdated(), option);
  }

  getDataTableConnected(): any {
    const tData = new google.visualization.DataTable();
    tData.addColumn('string', 'label');
    tData.addColumn('number', 'value');
    tData.addRows(this.updateConnectedChartData());
    return tData;
  }

  getDataTableUpdated(): any {
    const tData = new google.visualization.DataTable();
    tData.addColumn('string', 'label');
    tData.addColumn('number', 'value');
    tData.addRows(this.updateUpdatedChartData());
    return tData;
  }

  getOptionsConneted(): any {
    return {
      title: 'Veículos Conectados',
      width: 245,
      height: 250,
      colors: ['#133A7C', '#dbdbdc'],
      legend: 'none',
      fontSize: 13,
    };
  }

  getOptionsUpdated(): any {
    return {
      title: 'Update Software',
      width: 245,
      height: 250,
      colors: ['#133A7C', '#dbdbdc'],
      legend: 'none',
      fontSize: 13,
    };
  }

  // ========================================== vehicle ============================================= //

  vehiclePostData = {
    model: '',
    totalSales: '',
    connected: '',
    softwareUpdates: ''
  }

  vehicleMode: 'show' | 'add'  = 'show'

  onFileSelect(event:any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.uploadForm.get('profile').setValue(file);
    }
  }

  getVehicles(): void {
    this.fordApi.fetchVehicles().subscribe((res) => {
      this.veiculos = res;
    });
  }

  postVehicle(){
    const formData = new FormData();
    formData.append('vehicle_image', this.uploadForm.get('profile').value);
    formData.append('model', this.vehiclePostData.model);
    this.fordApi.upload(formData).subscribe();
    this.fordApi.sendVehicle(this.vehiclePostData).subscribe();
    alert(this.vehiclePostData.model+" Adicionado");
    this.getVehicles();
  }

  clearVehiclePostData(){
    this.vehiclePostData = {
      model: '',
      totalSales: '',
      connected: '',
      softwareUpdates: ''
    }
  }

  // =========================================== vehicleData ======================================== //

  getVehicleData(): void {
    this.fordApi.fetchVehicleData().subscribe((res) => {
      this.veiculoData = res;
    });
  }

  vin: string = '';

  data = {
    id: '',
    vin: '',
    odometer: '',
    fuelLevel: '',
    status: '',
    lat: '',
    long: '',
  };

  mode: 'search' | 'found' | 'add' | 'update' = 'search';

  postVehicleData(): void {
    if (this.vin !== '') {
      const postData = {
        vin: this.vin,
        odometer: this.data.odometer,
        tirePressure: '36,36,35,34',
        fuelLevel: this.data.fuelLevel,
        vehicleStatus: 'on',
        batteryStatus: this.data.status,
        latitude: this.data.lat,
        longitude: this.data.long,
      };
      this.fordApi.sendVehicleData(postData).subscribe((res) => {
        console.log(res);
      });
      alert('veículo ' + this.vin + ' adicionado');
      this.emptyData(true);
      this.getVehicleData();
    } else {
      alert('Campo Vin não pode estar vazio.');
    }
  }

  searchVehicleData(): void {
    let found: boolean = false;

    if (this.veiculoData.length){
      this.veiculoData.forEach((el: any) => {
        if (el.vin == this.vin.trim()) {
          this.data.id = el.id;
          this.data.odometer = el.odometer;
          this.data.fuelLevel = el.fuelLevel;
          this.data.status = el.VehicleStatus;
          this.data.lat = el.latitude;
          this.data.long = el.longitude;
          this.mode = 'found';
          found = true;
        }
      });
    }

    if (!found) {
      this.emptyData();
      this.mode = 'search';
    }
  }

  emptyData(eraseVin: boolean = false): void {
    if (eraseVin) this.vin = '';
    this.data.odometer = '';
    this.data.fuelLevel = '';
    this.data.status = '';
    this.data.lat = '';
    this.data.long = '';
  }

  updateVehicleData(): void {
    const uData = {
      vin: this.vin,
      odometer: this.data.odometer,
      fuelLevel: this.data.fuelLevel,
      tirePressure: '36,36,35,34',
      vehicleStatus: this.data.status,
      batteryStatus: 'on',
      latitude: this.data.lat,
      longitude: this.data.long,
    };
    this.fordApi.editVehicleData(uData, this.data.id).subscribe((res) => {
      console.log(res);
    });
    alert('veículo ' + this.vin + ' editado');
    this.getVehicleData();
    this.mode = 'found';
  }

  removeVehicleData(): void {
    this.fordApi.deleteVehicleData(this.data.id).subscribe((res) => {
      console.log(res);
    });
    alert('veículo ' + this.vin + ' removido');
    this.getVehicleData();
    this.emptyData();
    this.mode = 'search';
  }
}
