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
  constructor(private getDataService: GetDataService) { }

  ngOnInit() {
    this.showSearchWidget = true;
  }

  search() {
    this.searchResult = [];
    let data = (this.getDataService.getData(this.searchPhrase));
    console.log("searchText", data);
    if (data && data.length) {
      this.showSearchWidget = false;
      data.forEach((d) => {
        d.lines.forEach((l) => {
          for (let t in l) {
            this.searchResult.push(l[t]);
          }
        });
      });
    }else{
      alert("No data found !!! Please check SearchPhrase.");
    }
    console.log("data.heading == ", this.searchResult);
  }

  back() {
    this.showSearchWidget = true;
  }
}
