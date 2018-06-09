import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers  }       from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { resolve } from 'url';
import { reject } from 'q';   
@Injectable()
export class UserService {

  constructor(private http: Http) { }

  // getUser(){
  //   return new Promise((reject,resolve)=>{
  //     this.http.get('http://localhost:8000/getUser').map(res=>res.json()) 
  //     .subscribe((data)=>{
  //       resolve(data)
  //     },error=>{
  //       reject(error);
  //     })
  //   })
  // }

  getUser() {
    return new Promise((resolve,reject)=>{
      this.http.get('http://localhost:8000/getUser').map(res=>res.json())
      .subscribe((data)=>{
        resolve(data)
      },error=>{
        reject(error);
      })
    })
  }

   postUser(data){
    return new Promise((resolve,reject)=>{
      let headers = new Headers({ "Content-Type": "application/json" });
      let options = new RequestOptions({ headers: headers });
      this.http.post( "http://localhost:8000/postUser", JSON.stringify(data), options)
        .map(res => res.json())
        .subscribe((data)=>{
          resolve(data)
        },error=>{
          reject(error);
        });
    });
  }
}
