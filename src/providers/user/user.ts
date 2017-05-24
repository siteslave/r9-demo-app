import { Injectable, Inject } from '@angular/core';
import { Http } from '@angular/http';
import { AuthHttp } from 'angular2-jwt';

import 'rxjs/add/operator/map';

@Injectable()
export class UserProvider {

  constructor(
    private http: Http,
    @Inject('API_URL') private url: string,
    private authHttp: AuthHttp
  ) { }

  getUsers() {
    return new Promise((resolve, reject) => {
      let url = `https://randomuser.me/api/?results=10`;
      this.http.get(url)
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        }, error => {
          reject(error);
        });
    })
  }

  getStudents(limit: number, offset: number) {
    console.log(limit, offset);
    return new Promise((resolve, reject) => {
      let url = `${this.url}/students/list/${limit}/${offset}`;
      this.authHttp.get(url)
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        }, error => {
          reject(error);
        });
    })
  }

  getStudentTotal() {
    return new Promise((resolve, reject) => {
      let url = `${this.url}/students/total`;
      this.http.get(url)
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        }, error => {
          reject(error);
        });
    })
  }

  doLogin(username: string, password: string) {
    return new Promise((resolve, reject) => {
      let url = `${this.url}/users`;
      this.http.post(url, {
        username: username,
        password: password
      })
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        }, error => {
          reject(error);
        });
    })
  }



}
