import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UserProvider } from '../../providers/user/user';

@IonicPage()
@Component({
  selector: 'page-ipd',
  templateUrl: 'ipd.html',
  // providers: [UserProvider]
})
export class IpdPage {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public userProvider: UserProvider
  ) {
  }

  ionViewDidLoad() {
    this.userProvider.getUsers()
      .then((data: any) => {
        console.log(data);
      })
      .catch((error: any) => {
        console.error(error);
      });
  }

}
