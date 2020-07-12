import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { GetDataService } from '../services/get-data.service';
import { Router } from '@angular/router';
import { Plugins } from '@capacitor/core';
const { App } = Plugins;

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss'],
  providers: [GetDataService],
})
export class TabsPage {
  constructor(private getDataService: GetDataService, private platform: Platform, private router: Router) {
    console.log(platform.platforms());
    this.platform.backButton.subscribeWithPriority(5, () => {
      console.log('Handler was called!');
      App.exitApp();
    });
  }

  getSelected() {
    console.log("tab clicked");
    this.getDataService.setTabClick(true);
    this.router.navigate(['/']);
  }
}
