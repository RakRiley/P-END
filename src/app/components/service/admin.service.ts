import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers  } from '@angular/http';
import 'rxjs/add/operator/map';
import { UrlResolver } from '@angular/compiler';
import { environment } from '../../../environments/environment';

@Injectable()
export class AdminService {

  constructor(private http:Http) { }

  getAdmin() {
    return new Promise((resolve,reject)=>{
      this.http.get(environment.api+'/getAdmin').map(res=>res.json())
      .subscribe((data)=>{
        resolve(data)
      },error=>{
        reject(error);
      })
    })
  }
}
