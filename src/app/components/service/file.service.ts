import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers  } from '@angular/http';
import 'rxjs/add/operator/map';
@Injectable()
export class FileService {

  constructor(private http :Http) { }




  postFile(data){
    return new Promise((resolve,reject)=>{
      let header = new Headers({ "Content-Type": "application/json" });
      let options = new RequestOptions({ headers: header });
      this.http.post( "http://localhost:8000/postFile", JSON.stringify(data), options)
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
      let header = new Headers({ "Content-Type": "application/pdf" });
      let options = new RequestOptions({ headers: header });
      this.http.put( "http://localhost:8000/putFile/"+id, {json:123}, options)
        .map(res => res)
        .subscribe((data)=>{
          resolve(data)
        },error=>{
          reject(error);
        });
    });
  }

}
