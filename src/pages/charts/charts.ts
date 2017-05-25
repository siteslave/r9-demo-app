import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { UserProvider } from '../../providers/user/user';

@IonicPage()
@Component({
  selector: 'page-charts',
  templateUrl: 'charts.html',
})
export class ChartsPage {
  options: any;
  options2: any;

  hdcChart: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public userProvider: UserProvider
  ) {
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
    this.userProvider.getChartData()
      .then((data: any) => {
        let chartData = data;
        let categories = [];
        let _dataA: any = {};
        let _dataB: any = {};
        _dataA.name = 'A';
        _dataB.name = 'B';
        _dataA.data = [];
        _dataB.data = [];

        chartData.forEach(v => {
          categories.push(v.HOSPNAME);
          _dataA.data.push(+v.S_A_TAKIS);
          _dataB.data.push(+v.S_B_TAKIS);
        });

        console.log(categories);
        console.log(_dataA);
        console.log(_dataB);


        this.hdcChart = {
          chart: {
            type: 'column'
          },
          title: {
            text: 'รายงานจาก HDC'
          },
          xAxis: {
            categories: categories, // ชื่อสถานหน่วยบริการ
            crosshair: true
          },
          yAxis: {
            min: 0,
            title: {
              text: 'คน'
            }
          },
          tooltip: {
            headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
            pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
            '<td style="padding:0"><b>{point.y:.1f} mm</b></td></tr>',
            footerFormat: '</table>',
            shared: true,
            useHTML: true
          },
          plotOptions: {
            column: {
              pointPadding: 0.2,
              borderWidth: 0
            }
          },
          //  {
          //   name: 'Tokyo',
          //   data: [49.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4]
          // }
          series: [_dataA, _dataB]
        }
      })
      .catch((error: any) => {
        console.log(error.message);
      });
  }

}
