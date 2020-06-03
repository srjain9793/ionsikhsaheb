import { Component, OnInit } from '@angular/core';
import { GetDataService } from '../services/get-data.service'

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
  providers: [GetDataService]
})
export class SearchPage implements OnInit {

  homeText;
  constructor(private getDataService: GetDataService) { }

  ngOnInit() {
    this.homeText = [];
    console.log("home text", this.homeText);
    let data = (this.getDataService.getData());
    data.div.forEach((d) => {
      d.lines.forEach((l) => {
        this.homeText.push(l['punjabi-text']);
      });
    });
    console.log("data.heading == ", data.heading);
  }

}
