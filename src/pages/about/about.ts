import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-about',
  templateUrl: 'about.html',
})
export class AboutPage {

  name: string;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.name = this.navParams.get('name');
    let data = this.navParams.data;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AboutPage');
  }

  // goBack() {
  //   this.navCtrl.pop();
  // }
}
