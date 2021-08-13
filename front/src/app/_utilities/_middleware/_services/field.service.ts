import { Injectable } from '@angular/core';
import { Field } from '../../_api/_data-types/interfaces';

@Injectable({
  providedIn: 'root'
})
export class FieldService {

  public fields: Field[] | null = null;

  constructor() { }

  getFields() {
    this.fields = [
      {
        id: 0,
        name: 'Sve oblasti'
      },
      {
        id: 1,
        name: 'IT'
      },
      {
        id: 2,
        name: 'Cvecarstvo'
      }
    ]
  }

  getTags(id: number) {

  }
}
