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

  isUpdate = false;
  id: number;

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
    });

    let data = this.navParams.data;
    this.id = data.id;
    this.firstName = data.first_name;
    this.lastName = data.last_name;
    this.email = data.email;
    this.telephone = data.telephone;
    if (this.id) this.isUpdate = true;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ContactNewPage');
  }

  saveContact() {
    if (this.isUpdate) {
      let sql = `
        UPDATE
        contacts SET first_name=?, last_name=?, email=?, telephone=?
        WHERE id=?`;

      this.connection.executeSql(sql, [
        this.firstName,
        this.lastName,
        this.email,
        this.telephone,
        this.id
      ])
        .then(data => {
          this.navCtrl.pop();
        }, error => {
          alert(JSON.stringify(error));
        });
    } else {
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

}
