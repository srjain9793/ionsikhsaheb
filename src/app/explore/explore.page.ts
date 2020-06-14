import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-explore',
  templateUrl: './explore.page.html',
  styleUrls: ['./explore.page.scss'],
})
export class ExplorePage implements OnInit {

  exploreList: any;
  constructor() { }

  ngOnInit() {
    this.exploreList = [
      { label: "Chapter Index", value: "" },
      { label: "Ang By Ang", value: "" },
      { label: "Shabad index", value: "" },
      { label: "Gurdas Var Index", value: "" },
      { label: "Sri Dasam Granth Index", value: "" },
      { label: "Sri Dasam Granth Page by Page", value: "" },
      { label: "Kabit by Kabit", value: "" },
      { label: "Bhai Nand lal Bani", value: "" },

    ]
  }




}
