import {Injectable} from '@angular/core';

@Injectable()
export class TableDataService {

  private testData = [
    {id: 1, year: '2017', make: 'Subaru', model: 'WRX', vin: '5H0HPSL0RZ'},
    {id: 2, year: '2017', make: 'Subaru', model: 'Outback', vin: 'GERLIZWKAO'},
    {id: 3, year: '2017', make: 'Subaru', model: 'Crosstrek', vin: '2C64PNINF7'},
    {id: 4, year: '2017', make: 'Subaru', model: 'Impreza', vin: 'AX10PPIRF6'},
    {id: 5, year: '2016', make: 'Subaru', model: 'WRX', vin: 'FOS4BT9Z04'},
    {id: 6, year: '2016', make: 'Subaru', model: 'Outback', vin: '34QY5CJOOO'},
    {id: 7, year: '2016', make: 'Subaru', model: 'Crosstrek', vin: 'E7Y5UUWN5V'},
    {id: 8, year: '2016', make: 'Subaru', model: 'Impreza', vin: '3WX0X7ET95'},
    {id: 9, year: '2015', make: 'Subaru', model: 'WRX', vin: 'TJLZ792QUQ'},
    {id: 10, year: '2015', make: 'Subaru', model: 'Outback', vin: 'VPVZE7WI14'},
    {id: 11, year: '2015', make: 'Subaru', model: 'Crosstrek', vin: 'OTB5RA90R3'},
    {id: 12, year: '2015', make: 'Subaru', model: 'Impreza', vin: 'T0EWWX76SE'},

    {id: 13, year: '2017', make: 'Honda', model: 'Accord', vin: 'NAJDUODBCQ'},
    {id: 14, year: '2017', make: 'Honda', model: 'Civic', vin: '3CNQBPKOG5'},
    {id: 15, year: '2017', make: 'Honda', model: 'Odyssey', vin: 'CVZ3J0OOU7'},
    {id: 16, year: '2016', make: 'Honda', model: 'Accord', vin: 'VKSELB7D9L'},
    {id: 17, year: '2016', make: 'Honda', model: 'Civic', vin: 'GO755RW7DU'},
    {id: 18, year: '2016', make: 'Honda', model: 'Odyssey', vin: 'XM8K2LYSTW'},
    {id: 19, year: '2015', make: 'Honda', model: 'Accord', vin: 'AKOV1271X4'},
    {id: 20, year: '2015', make: 'Honda', model: 'Civic', vin: '0RQBI41R6J'},
    {id: 21, year: '2015', make: 'Honda', model: 'Odyssey', vin: 'DO74S51XF3'},

    {id: 22, year: '2017', make: 'Toyota', model: 'Camry', vin: 'WD9QUISAL9'},
    {id: 23, year: '2017', make: 'Toyota', model: 'Corolla', vin: 'R09NHJ82Z2'},
    {id: 24, year: '2017', make: 'Toyota', model: 'Celica', vin: 'WPKFJJR78A'},
    {id: 25, year: '2016', make: 'Toyota', model: 'Camry', vin: 'J0WB40E43X'},
    {id: 26, year: '2016', make: 'Toyota', model: 'Corolla', vin: 'JVQ30XM6YR'},
    {id: 27, year: '2016', make: 'Toyota', model: 'Celica', vin: 'YOGD0MS526'},
    {id: 28, year: '2015', make: 'Toyota', model: 'Camry', vin: '783WYZCG5R'},
    {id: 29, year: '2015', make: 'Toyota', model: 'Corolla', vin: 'R7NZDIPVUU'},
    {id: 30, year: '2015', make: 'Toyota', model: 'Celica', vin: 'N2MWMUEQII'}
  ];

  public getTestData(): any[] {
    return this.testData.slice(0);
  }

}
