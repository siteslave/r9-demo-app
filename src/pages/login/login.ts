import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { JwtHelper } from 'angular2-jwt';

import { Push, PushObject, PushOptions } from '@ionic-native/push';

import {
  LoadingController,
  AlertController
} from 'ionic-angular';

import { TabsPage } from '../tabs/tabs';
import { UserProvider } from '../../providers/user/user';
import { EncryptProvider } from '../../providers/encrypt/encrypt';

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
    private userProvider: UserProvider,
    private encryptProvider: EncryptProvider,
    private push: Push
  ) {
  }


  login() {

    let loading = this.loadingCtrl.create({
      spinner: 'dots',
      content: 'รอซักครู่...'
    });
    loading.present();

    let objData = { username: this.username, password: this.password };
    let encText = this.encryptProvider.encrypt(JSON.stringify(objData));

    this.userProvider.doLogin(encText)
      .then((data: any) => {
        if (data.ok) {
          // success

          const options: PushOptions = {
            android: {
              senderID: '479076121612'
            },
            ios: {
              alert: 'true',
              badge: true,
              sound: 'false'
            },
            windows: {}
          };

          const pushObject: PushObject = this.push.init(options);

          pushObject.on('registration').subscribe((registration: any) => {
            // console.log(registration.registrationId);
            let token = data.token;
            let decoded = this.jwtHelper.decodeToken(token);

            // loading.dismiss();
            localStorage.setItem('token', token);
            localStorage.setItem('fullname', decoded.fullname);
            localStorage.setItem('id', decoded.id);

            let deviceToken = registration.registrationId;

            this.userProvider.registerDevice(decoded.id, deviceToken)
              .then((data: any) => {
                loading.dismiss();
                if (data.ok) {
                  this.navCtrl.setRoot(TabsPage);
                } else {
                  let alert = this.alertCtrl.create({
                    title: 'เกิดข้อผิดพลาด!',
                    subTitle: 'ไม่สามารถลงทะเบียน device token ได้!',
                    buttons: ['ตกลง']
                  });
                  alert.present();
                }
              })
              .catch((error: any) => {
                let alert = this.alertCtrl.create({
                  title: 'เกิดข้อผิดพลาด!',
                  subTitle: 'ไม่สามารถเชื่อมต่อกับ Server ได้',
                  buttons: ['ตกลง']
                });
                alert.present();
              });

          });

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
