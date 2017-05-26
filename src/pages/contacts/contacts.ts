import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, AlertController } from 'ionic-angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { ContactNewPage } from '../contact-new/contact-new';
import { CallNumber } from '@ionic-native/call-number';

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
    public platform: Platform,
    public alertCtrl: AlertController,
    public callNumber: CallNumber
  ) {
    this.platform.ready().then(() => {
      this.db.create({
        name: 'data.db',
        location: 'default'
      })
        .then((connection: SQLiteObject) => {
          this.connection = connection;
        }, (error) => {
          console.log(error);
        });
    })
  }

  addContact() {
    this.navCtrl.push(ContactNewPage);
  }

  ionViewWillEnter() {
    this.getContacts();
  }

  showConfirm(contact) {
    let confirm = this.alertCtrl.create({
      title: 'Are you sure?',
      message: 'คุณต้องการลบใช่หรือไม่?',
      buttons: [
        {
          text: 'ไม่',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: 'ใช่',
          handler: () => {
            this.remove(contact);
          }
        }
      ]
    });
    confirm.present();
  }

  remove(contact) {
    let id = contact.id;
    let sql = `DELETE FROM contacts WHERE id=?`;
    this.platform.ready().then(() => {
      this.db.create({
        name: 'data.db',
        location: 'default'
      })
        .then((connection: SQLiteObject) => {
          connection.executeSql(sql, [id])
            .then(() => {
              this.getContacts();
            }, error => {
              alert(JSON.stringify(error));
            });
        }, (error) => {
          console.log(error);
        });
    })
  }

  callPhone(telephone: string) {
    if (telephone) {
      this.callNumber.callNumber(telephone, true)
        .then(() => console.log('Launched dialer!'))
        .catch(() => console.log('Error launching dialer'));
    }
  }

  getContacts() {
    this.contacts = [];

    this.platform.ready().then(() => {
      this.db.create({
        name: 'data.db',
        location: 'default'
      })
        .then((connection: SQLiteObject) => {
          let sql = `
            SELECT * FROM contacts
            `;
          connection.executeSql(sql, [])
            .then(rs => {
              let rows = rs.rows;
              if (rows.length > 0) {
                for (let i = 0; i < rows.length; i++) {
                  console.log(rows.item(i));
                  this.contacts.push({
                    id: rows.item(i).id,
                    first_name: rows.item(i).first_name,
                    last_name: rows.item(i).last_name,
                    email: rows.item(i).email,
                    telephone: rows.item(i).telephone
                  });
                }
                console.log(this.contacts);
              } else {
                console.log('No data');
              }
            }, error => {
              alert(JSON.stringify(error));
            });
        }, (error) => {
          console.log(error);
        });
    })

  }

  edit(contact) {
    this.navCtrl.push(ContactNewPage, contact);
  }

  search(event) {

    let query = event.target.value;
    let _query = `%${query}%`; 

    this.contacts = [];

    this.platform.ready().then(() => {
      this.db.create({
        name: 'data.db',
        location: 'default'
      })
        .then((connection: SQLiteObject) => {
          let sql = `
            SELECT * FROM contacts
            WHERE first_name like ? or last_name like ?
            `;
          connection.executeSql(sql, [_query, _query])
            .then(rs => {
              let rows = rs.rows;
              if (rows.length > 0) {
                for (let i = 0; i < rows.length; i++) {
                  console.log(rows.item(i));
                  this.contacts.push({
                    id: rows.item(i).id,
                    first_name: rows.item(i).first_name,
                    last_name: rows.item(i).last_name,
                    email: rows.item(i).email,
                    telephone: rows.item(i).telephone
                  });
                }
                console.log(this.contacts);
              } else {
                console.log('No data');
              }
            }, error => {
              alert(JSON.stringify(error));
            });
        }, (error) => {
          console.log(error);
        });
    })
    
  }

}
