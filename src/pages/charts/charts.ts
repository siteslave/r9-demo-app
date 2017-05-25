import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-charts',
  templateUrl: 'charts.html',
})
export class ChartsPage {
  options: any;
  options2: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.options = {
      title: { text: 'simple chart' },
      chart: {
        type: 'line'
      },
      series: [{
        data: [29.9, 71.5, 106.4, 129.2],
      }]
    };
    this.options2 = {
      title: { text: 'simple chart' },
      chart: {
        type: 'bar'
      },
      series: [{
        data: [29.9, 71.5, 106.4, 129.2],
      }]
    };
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChartsPage');
  }

}
