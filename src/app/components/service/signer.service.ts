import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers  }       from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { resolve } from 'url';
import { reject } from 'q';
import {environment} from '../../../environments/environment'
@Injectable()
export class SignerService {

  constructor(private http:Http) { }

  getSigner() {
    return new Promise((resolve,reject)=>{
      this.http.get(environment.api+'/getSigner').map(res=>res.json())
      .subscribe((data)=>{
        resolve(data)
      },error=>{
        reject(error);
      })
    })
  }

   postSigner(data){
    return new Promise((resolve,reject)=>{
      let headers = new Headers({ "Content-Type": "application/json" });
      let options = new RequestOptions({ headers: headers });
      this.http.post( environment.api+"/postSigner", JSON.stringify(data), options)
        .map(res => res.json())
        .subscribe((data)=>{
          resolve(data)
        },error=>{
          reject(error);
        });
    });
  }

}
