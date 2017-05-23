import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { IpdPage } from '../ipd/ipd';
import { OpdPage } from '../opd/opd';
import { SettingPage } from '../setting/setting';

@IonicPage()
@Component({
  selector: 'page-main',
  templateUrl: 'main.html',
})
export class MainPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MainPage');
  }

  goOpdPage() {
    let params = {
      hn: '000001',
      name: 'Satit Rianpit',
      accesses: [
        {id: 1, name: 'Admin'},
        {id: 2, name: 'Super Admin'}
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

}
