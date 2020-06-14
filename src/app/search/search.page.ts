import { Component, OnInit } from '@angular/core';
import { GetDataService } from '../services/get-data.service'

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
  providers: [GetDataService]
})
export class SearchPage implements OnInit {

  searchPhrase;
  searchResult;
  showSearchWidget: boolean = true;
  searchCriteria;
  scriptureList: any;
  searchScripture: string;
  constructor(private getDataService: GetDataService) { }

  async ngOnInit() {
    this.showSearchWidget = true;
    this.scriptureList = await this.getDataService.getBaanisContent();
  }

  reset() {
    this.searchPhrase = "";
    this.searchCriteria = "";
    this.searchScripture = "";
  }

  async search() {
    this.searchResult = [];

    if (this.searchPhrase) {

      let searchObj = {
        searchText: this.searchPhrase,
        lineNumber: 0,
        searchCriteria: this.searchCriteria,
        searchScripture: this.searchScripture
      }

      let data: any = await this.getDataService.getSearchContent(searchObj);
      console.log("searchText", data, searchObj);

      if (data && data.length) {
        this.showSearchWidget = false;
        this.searchResult = data;
      } else {
        alert("No data found !!! Please check SearchPhrase.");
      }
    } else {
      alert("Please Enter SearchPhrase.");
    }

    console.log("data.heading == ", this.searchResult);
  }

  back() {
    this.showSearchWidget = true;
  }
}
