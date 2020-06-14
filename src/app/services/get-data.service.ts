import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class GetDataService {

  constructor(private http: HttpClient) {
    this.http = http;
    // this.readJson("");
  }

  async getHomeContent(homeContentIndex, scripture) {
    let data: any = await this.readJson(scripture);
    let homeText = [];
    data.div[homeContentIndex].lines.forEach((l) => {
      homeText.push(l['punjabi-text']);
    });
    return homeText;
  }

  getExploreContent() {

  }

  async getSearchContent(searchObj) {
    console.log("searchObj == ", searchObj);
    let data: any = await this.readJson(searchObj.searchScripture);
    let filterData;
    if (searchObj.searchText || searchObj.lineNumber) {
      filterData = [];
      data.div.forEach((d) => {
        let filterObj = {
          heading: data.heading,
          sub_heading: d.heading,
          descr: d.descr,
          lines: []
        };
        d.lines.forEach((l) => {
          let myLine = false;
          for (let w in l) {
            switch (searchObj.searchCriteria) {
              case "sc_b":
                if (l[w].split(" ").indexOf(searchObj.searchText) == 0) {
                  myLine = true;
                }
                break;

              case "sc_a":
                if (l[w].split(" ").includes(searchObj.searchText)) {
                  myLine = true;
                }
                break;

              case "sc_p":
                if (l[w].replace(/ /g, "") == (searchObj.searchText.replace(/ /g, ""))) {
                  myLine = true;
                }
                break;

              default:
                if (l[w].includes(searchObj.searchText)) {
                  myLine = true;
                }
                break;
            }

          }
          if (myLine) {
            for (let t in l) {
              filterObj.lines.push(l[t]);
            }

          }
        });
        if (filterObj.lines.length) filterData.push(filterObj);
      });
    } else {
      filterData = data;
    }
    return filterData;
  }

  async getBaanisContent(baani?: any) {
    if (baani) {

      return this.readJson(baani);

    } else {
      return await this.readJson("avail_scriptures");
    }
  }

  readJson(filename) {
    return new Promise((resolve, reject) => {
      try {
        filename = filename || 'japjisahib';
        this.http.get(`assets/scriptures/${filename}.json`)
          .subscribe(result => {
            console.log("result ==> ", result);
            resolve(result);
          });
      } catch (e) {
        console.log("Profile" + e);
      }
    });
  }
}
