import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-opd',
  templateUrl: 'opd.html',
})
export class OpdPage {
  hn: string;
  name: string;
  accesses: any = [];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    console.log(this.navParams.data)
    this.hn = this.navParams.get('hn');
    this.name = this.navParams.get('name');
    this.accesses = this.navParams.get('accesses');
    console.log(this.accesses);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OpdPage');
  }

}
