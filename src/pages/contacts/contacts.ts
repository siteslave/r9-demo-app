import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { ContactNewPage } from '../contact-new/contact-new';

@IonicPage()
@Component({
  selector: 'page-contacts',
  templateUrl: 'contacts.html',
})
export class ContactsPage {

  contacts: any[] = [];

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
          this.getContacts();
        }, (error) => {
          console.log(error);
        });
    })
  }

  addContact() {
    this.navCtrl.push(ContactNewPage);
  }

  ionViewDidLoad() {
    this.getContacts();
  }

  getContacts() {
    let sql = `
    SELECT * FROM contacts
    `;

    this.connection.executeSql(sql, [])
      .then(rows => {
        if (rows.length > 0) {
          for (let i = 0; i < rows.length; i++) {
            this.contacts.push({
              id: rows.item(i).id,
              first_name: rows.item(i).first_name,
              last_name: rows.item(i).last_name,
              email: rows.item(i).email
            });
          }
        }
      }, error => {
        alert(JSON.stringify(error));
      });
  }

}
