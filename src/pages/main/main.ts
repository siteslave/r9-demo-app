import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App } from 'ionic-angular';

import { IpdPage } from '../ipd/ipd';
import { OpdPage } from '../opd/opd';
import { SettingPage } from '../setting/setting';
import { AboutPage } from '../about/about';
import { LoginPage } from '../login/login';

@IonicPage()
@Component({
  selector: 'page-main',
  templateUrl: 'main.html',
})
export class MainPage {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public app: App
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MainPage');
  }

  goAbout() {
    this.navCtrl.push(AboutPage, {name: 'Ionic 3', id: 1});
  }

  goOpdPage() {
    let params = {
      hn: '000001',
      name: 'Satit Rianpit',
      accesses: [
        { id: 1, name: 'Admin' },
        { id: 2, name: 'Super Admin' }
      ]
    };
    this.navCtrl.push(OpdPage, params);
  }

  goIpdPage() {
    this.navCtrl.push(IpdPage)
  }

  goSettingPage() {
    this.navCtrl.push(SettingPage)
  }

  logout() {
    localStorage.removeItem('token');
    let nav = this.app.getRootNav();
    nav.setRoot(LoginPage);
    // this.navCtrl.setRoot(LoginPage)
  }

}
