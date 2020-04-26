import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Video } from '../models/video';
import { global } from './global';

@Injectable()
export class VideoService {
  public url: string;
  // public user: User;

  constructor(public http: HttpClient) {
    this.url = global.url;
  }

  create(token, video): Observable<any> {
    let json = JSON.stringify(video);
    let params = `json=${json}`;

    let headers = new HttpHeaders()
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .set('Authorization', token);
    // console.log(params);

    return this.http.post(this.url + 'video/new', params, { headers: headers });
  }

  getVideos(token, page): Observable<any> {
    if (!page) {
      page = 1;
    }
    let headers = new HttpHeaders()
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .set('Authorization', token);
    // console.log(params);

    return this.http.get(this.url + 'video/list?page=' + page, {
      headers: headers,
    });
  }

  getVideo(token, id): Observable<any> {
    let headers = new HttpHeaders()
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .set('Authorization', token);
    // console.log(params);

    return this.http.get(this.url + 'video/detail/' + id, {
      headers: headers,
    });
  }

  update(token, video, id): Observable<any> {
    let json = JSON.stringify(video);
    let params = `json=${json}`;

    let headers = new HttpHeaders()
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .set('Authorization', token);
    // console.log(params);

    return this.http.put(this.url + 'video/edit/' + id, params, {
      headers: headers,
    });
  }

  delete(token, id): Observable<any> {
    let headers = new HttpHeaders()
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .set('Authorization', token);
    // console.log(params);

    return this.http.delete(this.url + 'video/remove/' + id, {
      headers: headers,
    });
  }
}
