import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { GetDataService } from '../services/get-data.service';
import { PopoverController } from '@ionic/angular';
import { FilterComponent } from './filter.component';


@Component({
  selector: 'app-baanis',
  templateUrl: './baanis.page.html',
  styleUrls: ['./baanis.page.scss'],
  providers: [GetDataService],
  encapsulation: ViewEncapsulation.None,
})
export class BaanisPage implements OnInit {

  baanisList: any;
  baaniContent: any;
  selectedBaani: any;
  page = 1;
  totalPages = 0;
  pageTitle = "Baanis";
  showSearch = false;
  constructor(private getDataService: GetDataService, public popoverController: PopoverController) { }

  async ngOnInit() {
    this.page = 1;
    this.baanisList = await this.getDataService.getBaanisContent();
    console.log("this.baanisList == ", this.baanisList);
  }

  async presentPopover(ev: any) {
    const popover = await this.popoverController.create({
      component: FilterComponent,
      cssClass: 'my-custom-class',
      event: ev,
      translucent: true
    });
    return await popover.present();
  }

  async searchPageNo() {
    this.showSearch = true;
  }

  async cancelSearch() {
    this.showSearch = false;
  }

  async getContent(baani?: string) {
    this.selectedBaani = baani;
    this.totalPages = this.getDataService.getPageMapping(baani).length;
    this.baaniContent = await this.getDataService.getBaanisContent(baani);
  }

  back() {
    this.page = 1;
    this.selectedBaani = null;
    this.baaniContent = null;
  }

  async goToPage(pageNumber: number) {   
    this.page = ((this.page * 1) + pageNumber);
    if (this.page < this.totalPages) this.baaniContent = await this.getDataService.getBaanisContent(this.selectedBaani, this.page - 1);
    this.showSearch = false;
  }

}
