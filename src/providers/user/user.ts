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
    return new Promise((resolve, reject) => {
      let url = `${this.url}/students/list`;
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
      this.authHttp.get(url)
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        }, error => {
          reject(error);
        });
    })
  }

  getChartData() {
    return new Promise((resolve, reject) => {
      // let url = `http://203.157.182.15/api/getReport/3/0/2016`;
      let url = `${this.url}/chart-data`;
      this.authHttp.get(url)
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        }, error => {
          reject(error);
        });
    })
  }

  doLogin(data: string) {
    return new Promise((resolve, reject) => {
      let url = `${this.url}/users`;
      this.http.post(url, {
        data: data
      })
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        }, error => {
          reject(error);
        });
    })
  }

  registerDevice(id: any, deviceToken: string) {
    return new Promise((resolve, reject) => {
      let url = `${this.url}/students/register-device`;
      this.authHttp.post(url, {
        id: id,
        deviceToken: deviceToken
      })
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        }, error => {
          reject(error);
        });
    })
  }

  getUserList() {
    return new Promise((resolve, reject) => {
      let url = `${this.url}/students/users-list`;
      this.authHttp.get(url)
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        }, error => {
          reject(error);
        });
    })
  }

  getGroupList() {
    return new Promise((resolve, reject) => {
      let url = `${this.url}/students/groups-list`;
      this.authHttp.get(url)
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        }, error => {
          reject(error);
        });
    })
  }

  sendMessage(msg: string, ids: any[]) {
    return new Promise((resolve, reject) => {
      let url = `${this.url}/students/send-message`;
      this.authHttp.post(url, {
        msg: msg,
        ids: ids
      })
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        }, error => {
          reject(error);
        });
    })
  }

  saveImage(id: any, image: string) {
    return new Promise((resolve, reject) => {
      let url = `${this.url}/students/save-image`;
      this.authHttp.post(url, {
        id: id,
        image: image
      })
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        }, error => {
          reject(error);
        });
    })
  }

  getImage(id: any) {
    return new Promise((resolve, reject) => {
      let url = `${this.url}/students/get-image/${id}`;
      this.authHttp.get(url)
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        }, error => {
          reject(error);
        });
    })
  }


}
