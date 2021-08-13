import { Injectable } from '@angular/core';
import { City } from '../../_api/_data-types/interfaces';

@Injectable({
  providedIn: 'root'
})
export class CityService {

  public cities: City[] | null = null;

  constructor() { }

  getCities() {
    this.cities = [
      {
        id: 0,
        name: 'Svi gradovi'
      },
      {
        id: 1,
        name: 'Beograd'
      },
      {
        id: 4,
        name: 'Kragujevac'
      },
      {
        id: 8,
        name: 'Novi Sad'
      }
    ]
  }
}
