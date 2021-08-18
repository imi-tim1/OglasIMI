import { Injectable } from '@angular/core';
import { Field } from '../../_api/_data-types/interfaces';
import { Tag } from '../../_api/_data-types/interfaces';
import { FieldApiService } from '../../_api/_services/field-api.service';

@Injectable({
  providedIn: 'root'
})
export class FieldService {

  public fields: Field[] = [];
  public tags: Tag[] = [];

  constructor(private api: FieldApiService) { }

  getFields() 
  {
    this.api.getFields().subscribe(
      // Success
      (response) => {
        console.log('Get Fields (Success), Body: ')
        console.log(response.body)
        this.fields = (response.body == null)? [] : response.body;
        console.log('Fields: ')
        console.log(this.fields)
      }
    );
  }

  getTags(fieldId: number) {
    this.api.getTags(fieldId).subscribe(
      // Success
      (response) => {
        console.log('Get Tags (Success), Body: ')
        console.log(response.body)
        this.tags = (response.body == null)? [] : response.body;
        console.log('Tags: ')
        console.log(this.tags)
      }
    );
  }
}
