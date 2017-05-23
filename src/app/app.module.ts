import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { MainPage } from '../pages/main/main';
import { IpdPage } from '../pages/ipd/ipd';
import { OpdPage } from '../pages/opd/opd';
import { SettingPage } from '../pages/setting/setting';
import { AboutPage } from '../pages/about/about';
import { TabsPage } from '../pages/tabs/tabs';

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
    TabsPage
  ],
  imports: [
    BrowserModule,
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
    TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule { }
