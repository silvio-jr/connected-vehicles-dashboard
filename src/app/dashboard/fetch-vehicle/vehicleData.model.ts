export interface VeiculosData extends Array<VeiculoData> {}

export interface VeiculoData{
  id: number | string
  vin: string
  status: string
  fuelLevel: number | string
  lat: number | string
  long: number | string
}

export interface VeiculosDataAPI {
  vehicles: VeiculosData;
}
