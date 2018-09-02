import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers  } from '@angular/http';
import 'rxjs/add/operator/map';
import { UrlResolver } from '@angular/compiler';
import { environment } from '../../../environments/environment';

@Injectable()
export class DateService {

  constructor(private http:Http) { }

  getDate() {
    return new Promise((resolve,reject)=>{
      this.http.get(environment.api+'/getDate').map(res=>res.json())
      .subscribe((data)=>{
        resolve(data)
      },error=>{
        reject(error);
      })
    })
  }

  getNewDate() {
    return new Promise((resolve,reject)=>{
      this.http.get(environment.api+'/getNewDate').map(res=>res.json())
      .subscribe((data)=>{
        resolve(data)
      },error=>{
        reject(error);
      })
    })
  }

  getNumYear() {
    return new Promise((resolve,reject)=>{
      this.http.get(environment.api+'/getNumYear').map(res=>res.json())
      .subscribe((data)=>{
        resolve(data)
      },error=>{
        reject(error);
      })
    })
  }

  getNumMounth() {
    return new Promise((resolve,reject)=>{
      this.http.get(environment.api+'/getNumMounth').map(res=>res.json())
      .subscribe((data)=>{
        resolve(data)
      },error=>{
        reject(error);
      })
    })
  }

  getallYear() {
    return new Promise((resolve,reject)=>{
      this.http.get(environment.api+'/getallYear').map(res=>res.json())
      .subscribe((data)=>{
        resolve(data)
      },error=>{
        reject(error);
      })
    })
  }

   postDate(data){
    return new Promise((resolve,reject)=>{
      let headers = new Headers({ "Content-Type": "application/json" });
      let options = new RequestOptions({ headers: headers });
      console.log('success post date');
      this.http.post( environment.api+"/postDate", JSON.stringify(data), options)
        .map(res => res.json())
        .subscribe((data)=>{
          resolve(data)
        },error=>{
          reject(error);
        });
    });
  }



}
