import { Component } from '@angular/core';
import { File } from '@ionic-native/file/ngx';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss'],
  providers: [File]
})
export class TabsPage {
  constructor(private file: File, private platform: Platform) {
    console.log(platform.platforms());
    if (platform.is('mobile') && !  platform.is('mobileweb')) {
      this.checkDir();
    }
  }

  checkDir() {
    console.log("this.file.dataDirectory-->", this.file.dataDirectory);
    this.file.checkDir('/home/shailesh/', 'Documents')
      .then(_ => console.log('Directory exists'))
      .catch(err => console.log("Directory doesn't exist"));
  }
}
