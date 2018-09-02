import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers  } from '@angular/http';
import 'rxjs/add/operator/map';
import { UrlResolver } from '@angular/compiler';
import { environment } from '../../../environments/environment';

@Injectable()
export class YearPegService {

  constructor(private http:Http) { }

  getYear_peg() {
    return new Promise((resolve,reject)=>{
      this.http.get(environment.api+'/getYear_peg').map(res=>res.json())
      .subscribe((data)=>{
        resolve(data)
      },error=>{
        reject(error);
      })
    })
  }

  postYear_peg(data){
    return new Promise((resolve,reject)=>{
      let headers = new Headers({ "Content-Type": "application/json" });
      let options = new RequestOptions({ headers: headers });
      this.http.post( environment.api+"/postYear_peg", JSON.stringify(data), options)
        .map(res => res.json())
        .subscribe((data)=>{
          resolve(data)
        },error=>{
          reject(error);
        });
    });
  }

  putYear_peg(data,year_change){
    return new Promise((resolve,reject)=>{
      let header = new Headers({ "Content-Type": "application/json" });
      let options = new RequestOptions({ headers: header });
      this.http.put( environment.api+"/putYear_peg/"+year_change, data, options)
        .map(res => res)
        .subscribe((data)=>{
          resolve(data)
        },error=>{
          reject(error);
        });
    });
  }

}
