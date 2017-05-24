import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class UserProvider {

  constructor(private http: Http) {

  }

  getUsers() {
    return new Promise((resolve, reject) => {
      let url = `http://jsonplaceholder.typicode.com/users`;
      this.http.get(url)
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        }, error => {
          reject(error);
        });
      // .subscribe(function (data) { }, function (error) {})
    })
  }

}
