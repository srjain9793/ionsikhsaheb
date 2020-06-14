import { Component, OnInit } from '@angular/core';
import { GetDataService } from '../services/get-data.service'

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  providers: [GetDataService]
})
export class HomePage implements OnInit {

  homeText;
  homeContentIndex = -1;
  constructor(private getDataService: GetDataService) { }

  ngOnInit() {
    this.getContent();
  }

  doRefresh(event) {
    console.log("-->", event);
    this.getContent();
    event.target.complete();
  }

  async getContent() {
    this.homeContentIndex++;
    this.homeText = [];
    console.log("home text", this.homeText);
    this.homeText = await this.getDataService.getHomeContent(this.homeContentIndex, "chantsaasakivaar");
  }

}
