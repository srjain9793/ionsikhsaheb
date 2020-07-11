import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class GetDataService {

  loading: any;
  tabClicked = false;

  constructor(private http: HttpClient, public loadingController: LoadingController) {
    this.http = http;
    // this.readJson("");
    this.tabClicked = true;
  }

  async presentLoading() {
    this.loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Please wait...',
      // duration: 2000
    });
    await this.loading.present();

    // const { role, data } = await loading.onDidDismiss();
    console.log('Loading dismissed!');
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

  async getBaanisContent(url?: string, baani?: any, page?: number) {
    if (baani) {
      await this.presentLoading();
      let data;
      try {

        data = await this.getPages(url, baani, page);
      } catch (error) {
        alert("Some Error Occurred! Page not available");
      }
      this.loading.dismiss();
      return data;

    } else {
      return await this.readJson("avail_scriptures");
    }
  }

  // getPagesOLD(baani?: string, page?: number) {
  //   page = page ? page : 0;
  //   return new Promise((resolve, reject) => {
  //     try {
  //       if (this.getPageMapping(baani)[page]) {

  //         this.http.get(`http://sggsonline.com/wp-json/wp/v2/pages/${this.getPageMapping(baani)[page]}`)
  //           .subscribe((result: any) => {
  //             console.log("result ==> ", result);
  //             resolve(result.content.rendered);
  //           });

  //       } else {
  //         resolve(false);
  //       }
  //     } catch (e) {
  //       console.log("Profile" + e);
  //     }
  //   });
  // }

  getPages(url, baani?: string, page?: number) {
    page = page ? page : 0;
    return new Promise((resolve, reject) => {
      try {

        this.http.get(url.replace("{pagenumber}", page))
          .subscribe(
            (result: any) => { console.log('success', result); resolve(result.content.rendered); },
            (error: any) => { console.log('oops', error); reject(); }
          )

      } catch (e) {
        console.log("Profile" + e);
      }
    });
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



  getTabClick() {
    console.log("tab click get serice");
    return this.tabClicked;
  }

  setTabClick(t) {
    console.log("tab click set serice");
    this.tabClicked = t;
    return t;
  }

  // getPageMapping(baani: string) {
  //   let mapp = {
  //     AasaKiVaar: [
  //       1984,
  //       1999,
  //       2003,
  //       2006,
  //       2011,
  //       2015,
  //       2022,
  //       2028,
  //       2033,
  //       2038,
  //       2040,
  //       2044,
  //       2048,
  //       2051
  //     ]
  //   }
  //   return mapp[baani];
  // }
}
