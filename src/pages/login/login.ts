import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { JwtHelper } from 'angular2-jwt';

import {
  LoadingController,
  AlertController
} from 'ionic-angular';

import { TabsPage } from '../tabs/tabs';
import { UserProvider } from '../../providers/user/user';


@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  username: string;
  password: string;

  jwtHelper: JwtHelper = new JwtHelper();

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private userProvider: UserProvider
  ) {
  }

  login() {

    let loading = this.loadingCtrl.create({
      spinner: 'dots',
      content: 'รอซักครู่...'
    });
    loading.present();

    this.userProvider.doLogin(this.username, this.password)
      .then((data: any) => {
        if (data.ok) {
          // success
          let token = data.token;
          let decoded = this.jwtHelper.decodeToken(token);
          console.log(token);
          console.log(decoded);

          loading.dismiss();
          localStorage.setItem('token', token);
          localStorage.setItem('fullname', decoded.fullname);
          localStorage.setItem('id', decoded.id);
          this.navCtrl.setRoot(TabsPage);
        } else {
          // login failed!
          loading.dismiss();
          let alert = this.alertCtrl.create({
            title: 'เกิดข้อผิดพลาด!',
            subTitle: 'ชื่อผู้ใช้งาน/รหัสผ่าน ไม่ถูกต้อง!',
            buttons: ['ตกลง']
          });
          alert.present();
        }
      })
      .catch((error: any) => {
        loading.dismiss();
        let alert = this.alertCtrl.create({
          title: 'เกิดข้อผิดพลาด!',
          subTitle: 'ไม่สามาถเชื่อมต่อกับ Server ได้!',
          buttons: ['ตกลง']
        });
        alert.present();
      });

  }

}
