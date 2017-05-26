import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { LoginPage } from '../pages/login/login';
import { TabsPage } from '../pages/tabs/tabs';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any;

  constructor(
    platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    sqlite: SQLite
  ) {
    platform.ready().then(() => {
      let token = localStorage.getItem('token');

      sqlite.create({
        name: 'data.db',
        location: 'default'
      })
        .then((db: SQLiteObject) => {
          let sql = `
          CREATE TABLE IF NOT EXISTS
          contacts(id INTEGER PRIMARY KEY AUTOINCREMENT,
          first_name TEXT,
          last_name TEXT,
          sex TEXT,
          telephone TEXT,
          email TEXT)
          `;
          db.executeSql(sql, {})
            .then(() => console.log('Executed SQL'))
            .catch(e => console.log(e));
        })
        .catch(e => console.log(e));

      if (token) {
        this.rootPage = TabsPage;
      } else {
        this.rootPage = LoginPage;
      }
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}

