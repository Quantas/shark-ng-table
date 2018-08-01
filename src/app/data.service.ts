import {Injectable} from '@angular/core';

@Injectable()
export class TableDataService {

  private testData = [
    {year: '2017', make: 'Subaru', model: 'WRX', vin: '5H0HPSL0RZ'},
    {year: '2017', make: 'Subaru', model: 'Outback', vin: 'GERLIZWKAO'},
    {year: '2017', make: 'Subaru', model: 'Crosstrek', vin: '2C64PNINF7'},
    {year: '2017', make: 'Subaru', model: 'Impreza', vin: 'AX10PPIRF6'},
    {year: '2016', make: 'Subaru', model: 'WRX', vin: 'FOS4BT9Z04'},
    {year: '2016', make: 'Subaru', model: 'Outback', vin: '34QY5CJOOO'},
    {year: '2016', make: 'Subaru', model: 'Crosstrek', vin: 'E7Y5UUWN5V'},
    {year: '2016', make: 'Subaru', model: 'Impreza', vin: '3WX0X7ET95'},
    {year: '2015', make: 'Subaru', model: 'WRX', vin: 'TJLZ792QUQ'},
    {year: '2015', make: 'Subaru', model: 'Outback', vin: 'VPVZE7WI14'},
    {year: '2015', make: 'Subaru', model: 'Crosstrek', vin: 'OTB5RA90R3'},
    {year: '2015', make: 'Subaru', model: 'Impreza', vin: 'T0EWWX76SE'},

    {year: '2017', make: 'Honda', model: 'Accord', vin: 'NAJDUODBCQ'},
    {year: '2017', make: 'Honda', model: 'Civic', vin: '3CNQBPKOG5'},
    {year: '2017', make: 'Honda', model: 'Odyssey', vin: 'CVZ3J0OOU7'},
    {year: '2016', make: 'Honda', model: 'Accord', vin: 'VKSELB7D9L'},
    {year: '2016', make: 'Honda', model: 'Civic', vin: 'GO755RW7DU'},
    {year: '2016', make: 'Honda', model: 'Odyssey', vin: 'XM8K2LYSTW'},
    {year: '2015', make: 'Honda', model: 'Accord', vin: 'AKOV1271X4'},
    {year: '2015', make: 'Honda', model: 'Civic', vin: '0RQBI41R6J'},
    {year: '2015', make: 'Honda', model: 'Odyssey', vin: 'DO74S51XF3'},

    {year: '2017', make: 'Toyota', model: 'Camry', vin: 'WD9QUISAL9'},
    {year: '2017', make: 'Toyota', model: 'Corolla', vin: 'R09NHJ82Z2'},
    {year: '2017', make: 'Toyota', model: 'Celica', vin: 'WPKFJJR78A'},
    {year: '2016', make: 'Toyota', model: 'Camry', vin: 'J0WB40E43X'},
    {year: '2016', make: 'Toyota', model: 'Corolla', vin: 'JVQ30XM6YR'},
    {year: '2016', make: 'Toyota', model: 'Celica', vin: 'YOGD0MS526'},
    {year: '2015', make: 'Toyota', model: 'Camry', vin: '783WYZCG5R'},
    {year: '2015', make: 'Toyota', model: 'Corolla', vin: 'R7NZDIPVUU'},
    {year: '2015', make: 'Toyota', model: 'Celica', vin: 'N2MWMUEQII'}
  ];

  public getTestData(): any[] {
    return this.testData.slice(0);
  }

}
