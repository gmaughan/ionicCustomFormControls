import { Component } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

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
