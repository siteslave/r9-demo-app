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

    this.userProvider.getUsers()
      .then((data: any) => {
        this.users = data.results;
        // hide loading
        loading.dismiss();
      })
      .catch((error: any) => {
        // hide loading
        loading.dismiss();
        console.error(error);
      });

  }

}
