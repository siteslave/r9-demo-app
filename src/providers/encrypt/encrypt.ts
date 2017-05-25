import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import * as CryptoJs from 'crypto-js';

@Injectable()
export class EncryptProvider {

  encKey: string = '1234567890';

  constructor(public http: Http) {
    console.log('Hello EncryptProvider Provider');
  }

  encrypt(data: string) {
    let ciphertext = CryptoJs.AES.encrypt(data, this.encKey);
    return ciphertext.toString();
  }

  decrypt(enc: string) {
    let bytes = CryptoJs.AES.decrypt(enc, this.encKey);
    let plaintext = bytes.toString(CryptoJs.enc.Utf8);
    return plaintext;
  }

}
