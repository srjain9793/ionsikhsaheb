import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BaanisPage } from './baanis.page';

const routes: Routes = [
  {
    path: '',
    component: BaanisPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BaanisPageRoutingModule {}
