import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';

@IonicPage()
@Component({
  selector: 'page-contact-new',
  templateUrl: 'contact-new.html',
})
export class ContactNewPage {
  firstName: string;
  lastName: string;
  email: string;
  telephone: string;
  db: SQLite = new SQLite();
  connection: SQLiteObject;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public sqlite: SQLite,
    public platform: Platform
  ) {
    this.platform.ready().then(() => {
      this.db.create({
        name: 'data.db',
        location: 'default'
      })
        .then((connection: SQLiteObject) => {
          this.connection = connection;
          console.log('success');
        }, (error) => {
          console.log(error);
        });
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ContactNewPage');
  }

  saveContact() {
    let sql = `
    INSERT INTO 
    contacts(first_name, last_name, email, telephone)
    VALUES(?, ?, ?, ?)`;

    this.connection.executeSql(sql, [this.firstName, this.lastName, this.email, this.telephone])
      .then(data => {
        this.navCtrl.pop();
      }, error => {
        alert(JSON.stringify(error));
      });
  }

}
