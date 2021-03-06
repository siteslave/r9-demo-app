import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { Push } from '@ionic-native/push';
import { Camera } from '@ionic-native/camera';
import { PhotoViewer } from '@ionic-native/photo-viewer';
import { SQLite } from '@ionic-native/sqlite';
import { CallNumber } from '@ionic-native/call-number';
import { HttpModule, Http } from '@angular/http';
import { AuthHttp, AuthConfig } from 'angular2-jwt';

import { ChartModule } from 'angular2-highcharts';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { MainPage } from '../pages/main/main';
import { IpdPage } from '../pages/ipd/ipd';
import { OpdPage } from '../pages/opd/opd';
import { SettingPage } from '../pages/setting/setting';
import { AboutPage } from '../pages/about/about';
import { TabsPage } from '../pages/tabs/tabs';
import { ChartsPage } from '../pages/charts/charts';
import { MessagesPage } from '../pages/messages/messages';
import { ContactNewPage } from '../pages/contact-new/contact-new';
import { ContactsPage } from '../pages/contacts/contacts';

import { UserProvider } from '../providers/user/user';
import { EncryptProvider } from '../providers/encrypt/encrypt';

import { HighchartsStatic } from 'angular2-highcharts/dist/HighchartsService';

export function highchartsFactory() {
  return require('highcharts');
}

const Highcharts = require('highcharts');

Highcharts.setOptions({
  credits: false
});

export function getAuthHttp(http) {
  return new AuthHttp(new AuthConfig({
    noJwtError: true,
    globalHeaders: [{ 'Accept': 'application/json' }],
    tokenGetter: (() => localStorage.getItem('token')),
  }), http);
}

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    MainPage,
    IpdPage,
    OpdPage,
    SettingPage,
    AboutPage,
    TabsPage,
    ChartsPage,
    MessagesPage,
    ContactNewPage,
    ContactsPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    ChartModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    MainPage,
    IpdPage,
    OpdPage,
    SettingPage,
    AboutPage,
    TabsPage,
    ChartsPage,
    MessagesPage,
    ContactNewPage,
    ContactsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Push,
    Camera,
    PhotoViewer,
    SQLite,
    CallNumber,
    { provide: HighchartsStatic, useFactory: highchartsFactory },
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    { provide: 'API_URL', useValue: 'http://192.168.43.76:3000' },
    {
      provide: AuthHttp,
      useFactory: getAuthHttp,
      deps: [Http]
    },
    UserProvider,
    EncryptProvider
  ]
})
export class AppModule { }
