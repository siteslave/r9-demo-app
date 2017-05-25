import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';

import { AboutPage } from '../about/about';
import { SettingPage } from '../setting/setting';
import { MainPage } from '../main/main';
import { ChartsPage } from '../charts/charts';
import { MessagesPage } from '../messages/messages';

@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {
  tabHome: any;
  tabSetting: any;
  tabAbout: any;
  tabCharts: any;
  tabMessages: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public events: Events
  ) {
    this.tabAbout = AboutPage;
    this.tabHome = MainPage;
    this.tabSetting = SettingPage;
    this.tabCharts = ChartsPage;
    this.tabMessages = MessagesPage;
  }

  onTabChange(e) {
    if (e.index === 1) {
      this.events.publish('user:created', 'satit', Date.now());
    }
  }

  setDataSetting() {

  }
}
