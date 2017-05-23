import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

interface ICar {
  id?: number;
  name: string;
}

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  name: string = 'Ionic framework';
  username: string;
  password: string;
  myname = 'Satit Rianpit';
  myNumber: number = 0;

  cars: Array<any> = [];
  cars1: Array<{ id?: number, name: string }> = [];
  cars4: Array<ICar> = [{name: 'Honda'}];

  cars2 = [];
  cars3: any[] = [];

  constructor(public navCtrl: NavController) {
    this.cars1.push({ id: 1, name: 'Benz' });
    this.cars1.push({ name: 'Toyota' });

    this.cars1[0].id;
  }

  login() {
    let _username = 'admin';
    let _password = 'admin';

    if (_username === this.username && _password === this.password) {
      alert('Success');
    } else {
      alert('Login failed!!');
    }
  }

}
