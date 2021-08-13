import { Injectable } from '@angular/core';
import { Employer } from '../../_api/_data-types/interfaces';

@Injectable({
  providedIn: 'root'
})
export class EmployerService {

  public employers: Employer[] | null = null;

  constructor() { }

  getEmployers() {
    this.employers = [
      {
        id: 0,
        name: 'Svi poslodavci'
      },
      {
        id: 2,
        name: 'Comtrade'
      },
      {
        id: 4,
        name: 'Microsoft'
      }
    ]
  }
}
