import { Component } from '@angular/core';
import {
  IonicPage,
  NavController,
  NavParams,
  LoadingController
} from 'ionic-angular';

import { UserProvider } from '../../providers/user/user';

@IonicPage()
@Component({
  selector: 'page-ipd',
  templateUrl: 'ipd.html',
  // providers: [UserProvider]
})
export class IpdPage {

  users: any = [];
  perPage = 8;
  totalRecord = 0;
  startRecord = 0;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public userProvider: UserProvider,
    public loadingCtrl: LoadingController
  ) {
  }

  ionViewDidLoad() {
    let loading = this.loadingCtrl.create({
      spinner: 'dots',
      content: 'กรุณารอซักครุ่....'
    });
    // show loading
    loading.present();

    this.userProvider.getStudents(this.perPage, 0)
      .then((data: any) => {
        this.users = data.rows;
        return this.userProvider.getStudentTotal();
      })
      .then((data: any) => {
        this.totalRecord = data.total;
        loading.dismiss();
      })
      .catch((error: any) => {
        // hide loading
        loading.dismiss();
        console.error(error);
      });

  }


  doInfinite(infiniteScroll) {
    if (this.startRecord <= this.totalRecord) {
      this.startRecord += +this.perPage;

      let limit = +this.perPage;
      let offset = +this.startRecord;
      console.log(limit);
      console.log(offset);

      this.userProvider.getStudents(limit, offset)
        .then((data: any) => {
          this.users.push(data.rows);
          infiniteScroll.complete();
        })
        .catch((error: any) => {
          infiniteScroll.complete();
        });
    } else {
      infiniteScroll.complete();
    }
  }

}
