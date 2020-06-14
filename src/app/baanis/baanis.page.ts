import { Component, OnInit } from '@angular/core';
import { GetDataService } from '../services/get-data.service'

@Component({
  selector: 'app-baanis',
  templateUrl: './baanis.page.html',
  styleUrls: ['./baanis.page.scss'],
  providers: [GetDataService]
})
export class BaanisPage implements OnInit {

  baanisList: any;
  baaniContent: any;
  selectedBaani: any;
  constructor(private getDataService: GetDataService) { }

  async ngOnInit() {
    this.baanisList = await this.getDataService.getBaanisContent();
    console.log("this.baanisList == ", this.baanisList);
  }

  async getContent(baani?: string) {
    // this.homeContentIndex++;
    // this.homeText = [];
    // console.log("home text", this.homeText);
    this.baaniContent = await this.getDataService.getBaanisContent(baani);
  }

  back() {
    this.baaniContent = null;
  }

}
