import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers  } from '@angular/http';
import 'rxjs/add/operator/map';
import {environment} from '../../../environments/environment'
@Injectable()
export class FileService {

  constructor(private http :Http) { }


  getFile() {
    return new Promise((resolve,reject)=>{
      this.http.get(environment.api+'/getFile').map(res=>res.json())
      .subscribe((data)=>{
        resolve(data)
      },error=>{
        reject(error);
      })
    })
  }

  postFile(data){
    return new Promise((resolve,reject)=>{
      let header = new Headers({ "Content-Type": "application/json" });
      let options = new RequestOptions({ headers: header });
      this.http.post( environment.api+"/postFile", JSON.stringify(data), options)
        .map(res => res.json())
        .subscribe((data)=>{
          resolve(data)
        },error=>{
          reject(error);
        });
    });
  }
  putFile(data,id){
    return new Promise((resolve,reject)=>{
      let body ={
        pdf:data
      }
      let header = new Headers({ "Content-Type": "application/json" });
      let options = new RequestOptions({ headers: header });
      this.http.post( environment.api+"/putFile/"+id, body, options)
        .map(res => res)
        .subscribe((data)=>{
          resolve(data)
        },error=>{
          reject(error);
        });
    });
  }

}
