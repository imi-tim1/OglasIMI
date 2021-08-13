import { Injectable } from '@angular/core';
import { Field } from '../../_api/_data-types/interfaces';
import { Tag } from '../../_api/_data-types/interfaces';
import { FieldApiService } from '../../_api/_services/field-api.service';

@Injectable({
  providedIn: 'root'
})
export class FieldService {

  public fields: Field[] = [{id: 0, name: 'Sve oblasti'}];
  public tags: Tag[] = [{id: 0, name: 'Sve kljucne reci'}];

  constructor(private api: FieldApiService) { }

  getFields() 
  {
    this.api.getFields().subscribe(
      // Success
      (response) => {
        console.log('Get Fields (Success), Body: ')
        console.log(response.body)
        this.fields = this.fields.concat((response.body == null)? [] : response.body);
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
        this.tags = this.tags.concat((response.body == null)? [] : response.body);
        console.log('Tags: ')
        console.log(this.tags)
      }
    );
  }
}
