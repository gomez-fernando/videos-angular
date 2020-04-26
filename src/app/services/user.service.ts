import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { global } from './global';

@Injectable()
export class UserService {
  public url: string;
  public identity;
  public token;
  // public user: User;

  constructor(public http: HttpClient) {
    this.url = global.url;
  }

  prueba() {
    return 'hola desde el servicio';
  }

  register(user): Observable<any> {
    let json = JSON.stringify(user);
    let params = 'json=' + json;

    let headers = new HttpHeaders().set(
      'Content-Type',
      'application/x-www-form-urlencoded'
    );

    return this.http.post(this.url + 'register', params, { headers: headers });
  }

  signUp(user, gettoken = null): Observable<any> {
    if (gettoken != null) {
      user.gettoken = 'true';
    }

    let json = JSON.stringify(user);
    let params = `json=${json}`;

    let headers = new HttpHeaders().set(
      'Content-Type',
      'application/x-www-form-urlencoded'
    );
    // console.log(params);

    return this.http.post(this.url + 'login', params, { headers: headers });
  }

  getIdentity() {
    let identity = JSON.parse(localStorage.getItem('identity'));

    if (identity && identity != 'undefined') {
      this.identity = identity;
    } else {
      this.identity = null;
    }

    return this.identity;
  }

  getToken() {
    let token = localStorage.getItem('token');

    if (token && token != 'undefined') {
      this.token = token;
    } else {
      this.token = null;
    }

    return this.token;
  }
}
