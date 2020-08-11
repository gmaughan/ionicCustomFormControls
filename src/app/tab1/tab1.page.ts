import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  constructor() {}

  field1 = new FormControl('', Validators.required);
  field2 = new FormControl('', Validators.required);
  field3 = new FormControl('', Validators.required);

  form = new FormGroup({
    field1: this.field1,
    field2: this.field2,
    field3: this.field3
  });

  onSubmit(): void {
    if (this.form.valid) {
      console.log('form valid - submitted');
    } else {
      console.log('form invalid', this.form);
    }
  }

}
