import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BaanisPageRoutingModule } from './baanis-routing.module';

import { BaanisPage } from './baanis.page';
import { FilterComponent } from './filter.component'

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BaanisPageRoutingModule
  ],
  declarations: [BaanisPage, FilterComponent]
})
export class BaanisPageModule { }
