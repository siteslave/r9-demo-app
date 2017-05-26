import { Component, Inject } from '@angular/core';
import {
  IonicPage,
  NavController, NavParams,
  AlertController,
  LoadingController
} from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { PhotoViewer } from '@ionic-native/photo-viewer';

import { UserProvider } from '../../providers/user/user';


@IonicPage()
@Component({
  selector: 'page-about',
  templateUrl: 'about.html',
})
export class AboutPage {

  name: string;
  base64Preview: string;

  base64: string;
  id: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private camera: Camera,
    private userProvider: UserProvider,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController,
    private photoViewer: PhotoViewer,
    @Inject('API_URL') private url: string
  ) {
    this.name = this.navParams.get('name');
    let data = this.navParams.data;
  }

  ionViewDidLoad() {
    this.id = localStorage.getItem('id');
    this.userProvider.getImage(this.id)
      .then((data: any) => {
        if (data.ok) {
          this.base64 = data.image;
          this.base64Preview = 'data:image/jpeg;base64,' + data.image;
        }
      })
      .catch((error) => {
        console.error(error);
    })
  }

  takePicture() {
    const options: CameraOptions = {
      quality: 60,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: this.camera.PictureSourceType.CAMERA
    }

    this.camera.getPicture(options)
      .then((imageData) => {
        this.base64 = imageData;
        this.base64Preview = 'data:image/jpeg;base64,' + imageData;
      }, (err) => {
        // Handle error
        console.log(err);
      });

  }

  browsePicture() {
    const options: CameraOptions = {
      quality: 60,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
    }

    this.camera.getPicture(options)
      .then((imageData) => {
        this.base64 = imageData;
        this.base64Preview = 'data:image/jpeg;base64,' + imageData;
      }, (err) => {
        // Handle error
        console.log(err);
      });
  }

  saveImage() {
    let loading = this.loadingCtrl.create({
      spinner: 'dots',
      content: 'กำลังบันทึก...'
    });
    loading.present();

    this.id = localStorage.getItem('id');
    this.userProvider.saveImage(this.id, this.base64)
      .then((data: any) => {
        loading.dismiss();
        if (data.ok) {
          // success
          let alert = this.alertCtrl.create({
            title: 'ผลการบันทึก',
            subTitle: 'บันทึกภาพเสร็จเรียบร้อยแล้ว',
            buttons: ['ตกลง']
          });
          alert.present();
        } else {
          // error
          console.log(data.error);
          let alert = this.alertCtrl.create({
            title: 'ผลการบันทึก',
            subTitle: 'เกิดข้อผิดพลาด',
            buttons: ['ตกลง']
          });
          alert.present();
        }
      })
      .catch((error: any) => {
        loading.dismiss();
        let alert = this.alertCtrl.create({
          title: 'ผลการบันทึก',
          subTitle: 'เกิดข้อผิดพลาดไม่สามารถเชื่อมต่อกับ Server ได้',
          buttons: ['ตกลง']
        });
        alert.present();
      });
  }

  previewPicture() {
    let id = localStorage.getItem('id');
    let token = localStorage.getItem('token');
    let fullname = localStorage.getItem('fullname');

    let url = `${this.url}/students/preview-image/${id}?token=${token}`;
    this.photoViewer.show(url, fullname, {share: false});
  }
}
