import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { GetDataService } from '../services/get-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss'],
  providers: [GetDataService],
})
export class TabsPage {
  constructor(private getDataService: GetDataService, private platform: Platform, private router: Router) {
    console.log(platform.platforms());
  }

  getSelected() {
    console.log("tab clicked");
    this.getDataService.setTabClick(true);
    this.router.navigate(['/']);
  }
}
