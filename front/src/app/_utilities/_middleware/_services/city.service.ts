import { Injectable } from '@angular/core';
import { City } from '../../_api/_data-types/interfaces';
import { CityApiService } from '../../_api/_services/city-api.service';

@Injectable({
  providedIn: 'root'
})
export class CityService {

  public cities: City[] = [{id: 0, name: 'Svi gradovi'}];

  constructor(private api: CityApiService) { }

  getCities() {
    this.api.getCities().subscribe(
      // Success
      (response) => {
        console.log('Get Cities (Success), Body: ')
        console.log(response.body)
        this.cities.concat((response.body == null)? [] : response.body);
        console.log('Cities: ')
        console.log(this.cities)
      }
    );
  }
}
