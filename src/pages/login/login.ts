import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';

import { MainPage } from '../main/main';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  username: string;
  password: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private loadingCtrl: LoadingController
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  login() {
    if (this.username === 'admin' && this.password === 'admin') {
      let loading = this.loadingCtrl.create({
        spinner: 'dots',
        content: 'รอซักครู่...'
      });
      loading.present();
      setTimeout(() => {
        loading.dismiss();
        this.navCtrl.setRoot(MainPage);
      }, 3000);
    } else {
      alert('Login failed!');
    }
  }

}
