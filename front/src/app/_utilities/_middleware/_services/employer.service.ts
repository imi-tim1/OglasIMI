import { Injectable } from '@angular/core';
import { Employer } from '../../_api/_data-types/interfaces';
import { EmployerApiService } from '../../_api/_services/employer-api.service';

@Injectable({
  providedIn: 'root'
})
export class EmployerService {

  public employers: Employer[] = [{id: 0, name: 'Svi poslodavci'}];

  constructor(private api: EmployerApiService) { }

  getEmployers() {
    this.api.getEmployers().subscribe(
      // Success
      (response) => {
        console.log('Get Employers (Success), Body: ')
        console.log(response.body)
        this.employers.concat((response.body == null)? [] : response.body);
        console.log('Employers: ')
        console.log(this.employers)
      }
    );
  }
}
