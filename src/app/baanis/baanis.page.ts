import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { GetDataService } from '../services/get-data.service';
import { PopoverController } from '@ionic/angular';
import { FilterComponent } from './filter.component';
import { Router } from '@angular/router';
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
  baaniUrl = "";
  baniPageMapping: any;
  constructor(private getDataService: GetDataService, public popoverController: PopoverController, private router: Router) {
    console.log("this.baanisList == ", this.baanisList);
   }

  async ngOnInit() {
    this.page = 1;
    this.baanisList = await this.getDataService.getBaanisContent();
    console.log("this.baanisList == ", this.baanisList);
  }

  ionViewDidEnter(){
    this.back();
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
    if (this.selectedBaani) {
      this.showSearch = true;
    } else {
      alert("Please select a baani");
    }
  }

  async cancelSearch() {
    this.showSearch = false;
  }

  async getContent(url, baani?: string, mapping?: any) {
    this.selectedBaani = baani;
    this.baaniUrl = url;
    this.baniPageMapping = mapping;
    this.totalPages = this.baniPageMapping.length;
    this.baaniContent = await this.getDataService.getBaanisContent(url, baani, mapping[0]);
  }

  back() {
    this.page = 1;
    this.selectedBaani = null;
    this.baaniContent = null;
    this.baaniUrl = null;
  }

  async goToPage(pageNumber: number) {
    this.page = ((this.page * 1) + pageNumber);
    console.log("pageNumber -- ", pageNumber);
    console.log("baniPageMapping -- ", this.baniPageMapping[this.page - 1]);
    while (pageNumber != 0 && this.baniPageMapping[this.page - 1] < 0) {
      console.log("pageNumber -- ", pageNumber);
      console.log("baniPageMapping -- ", this.baniPageMapping[this.page - 1]);
      this.page = ((this.page * 1) + pageNumber);
    }
    console.log("page --baniPageMapping-----> ", this.page, this.baniPageMapping[this.page - 1]);
    if (this.page < this.totalPages) this.baaniContent = await this.getDataService.getBaanisContent(this.baaniUrl, this.selectedBaani, this.baniPageMapping[this.page - 1]);
    this.showSearch = false;
  }

  setPage(e) {
    console.log("setpage -- ", e, e.target.value);
    this.page = e.target.value * 1 ? e.target.value : 1;
  }
}
