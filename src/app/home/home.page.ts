import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  homeText;
  constructor() { }

  ngOnInit() {
    this.homeText = "This is home content";
    console.log("home text", this.homeText);
  }

}
