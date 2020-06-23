import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { GetDataService } from '../services/get-data.service'

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
  page = 0;
  totalPages = 0;
  pageTitle = "Baanis";
  constructor(private getDataService: GetDataService) { }

  async ngOnInit() {
    this.page = 0;
    this.baanisList = await this.getDataService.getBaanisContent();
    console.log("this.baanisList == ", this.baanisList);
  }

  async getContent(baani?: string) {
    this.selectedBaani = baani;
    this.totalPages = this.getDataService.getPageMapping(baani).length;
    this.baaniContent = await this.getDataService.getBaanisContent(baani);
  }

  back() {
    this.baaniContent = null;
  }

  async goToPage(pageNumber: number) {
    this.page = this.page + pageNumber;
    if (this.page < this.totalPages) this.baaniContent = await this.getDataService.getBaanisContent(this.selectedBaani, this.page);
  }

}
