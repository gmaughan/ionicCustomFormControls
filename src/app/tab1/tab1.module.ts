import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { Tab1Page } from './tab1.page';

import { Tab1PageRoutingModule } from './tab1-routing.module';
import { FileInputComponentModule } from '../file-input/file-input.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    ReactiveFormsModule,
    Tab1PageRoutingModule,
    FileInputComponentModule
  ],
  declarations: [Tab1Page]
})
export class Tab1PageModule {}
