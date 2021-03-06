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
      text: 'ตกลง',
      handler: data => {
        this.selectedUsers = data;
      }
    });
    alert.present();

  }

  sendMessage() {
    this.userProvider.sendMessage(this.message, this.selectedUsers)
      .then((data: any) => {
        if (data.ok) {
          let alert = this.alertCtrl.create({
            title: 'ผลการส่ง',
            subTitle: 'ส่งข้อมูลแจ้งเตือนสำเร็จ',
            buttons: ['ตกลง']
          });
          alert.present();
        } else {
          let alert = this.alertCtrl.create({
            title: 'ผลการส่ง',
            subTitle: 'ไม่สามารถส่งแจ้งเตือนได้ : ' + JSON.stringify(data.error),
            buttons: ['ตกลง']
          });
          alert.present();
        }
      })
  }

  ionViewDidLoad() {
    this.userProvider.getUserList()
      .then((data: any) => {
        this.users = data.rows;
      })
      .catch();
  }

}
