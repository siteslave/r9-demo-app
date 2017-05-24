import { Injectable, Inject } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class UserProvider {

  constructor(
    private http: Http,
    @Inject('API_URL') private url: string
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
