import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-setting',
  templateUrl: 'setting.html',
})
export class SettingPage {

  name: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public events: Events
  ) {

    this.events.subscribe('user:created', (user, time) => {
      console.log(user);
      this.name = user;
    });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingPage');
  }

}
