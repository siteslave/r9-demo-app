import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { AlertController } from 'ionic-angular';
import { UserProvider } from '../../providers/user/user';

@IonicPage()
@Component({
  selector: 'page-messages',
  templateUrl: 'messages.html',
})
export class MessagesPage {
  message: string;
  users: any[] = [];
  groups: any[] = [];
  selectedUsers: any[] = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    public userProvider: UserProvider
  ) {
  }

  selectUsers() {
    let alert = this.alertCtrl.create();
    alert.setTitle('เลือกผู้ใช้งานที่ต้องการส่งข้อความแจ้งเตือน');

    this.users.forEach(v => {
      alert.addInput({
        type: 'checkbox',
        label: v.fullname,
        value: v.id
      });
    });

    alert.addButton('ยกเลิก');
    alert.addButton({
      text: 'ส่งแจ้งเตือน',
      handler: data => {
        console.log('Checkbox data:', data);
      }
    });
    alert.present();

  }

  ionViewDidLoad() {
    this.userProvider.getUserList()
      .then((data: any) => {
        this.users = data.rows;
      })
      .catch();
  }

}
