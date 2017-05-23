import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';

import { AboutPage } from '../about/about';
import { SettingPage } from '../setting/setting';
import { MainPage } from '../main/main';

@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {
  tabHome: any;
  tabSetting: any;
  tabAbout: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public events: Events
  ) {
    this.tabAbout = AboutPage;
    this.tabHome = MainPage;
    this.tabSetting = SettingPage;
  }

  onTabChange(e) {
    if (e.index === 1) {
      this.events.publish('user:created', 'satit', Date.now());
    }
  }

  setDataSetting() {

  }
}
