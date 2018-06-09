import { Injectable } from '@angular/core';
import { Http }       from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { resolve } from 'url';
import { reject } from 'q';

@Injectable()
export class GetApiService {

  constructor(private http: Http) {
    
  }

  getAll() {
    return new Promise((resolve,reject)=>{
      this.http.get('http://localhost:8000/getUser').map(res=>res.json())
      .subscribe((data)=>{
        resolve(data)
      },error=>{
        reject(error);
      })
    })
            // 
  }

  

}
