import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

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

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.tabAbout = AboutPage;
    this.tabHome = MainPage;
    this.tabSetting = SettingPage;
  }
}
