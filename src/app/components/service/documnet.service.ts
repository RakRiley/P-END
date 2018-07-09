import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers  } from '@angular/http';

import 'rxjs/add/operator/map';
import { UrlResolver } from '@angular/compiler';
 var swal = require('sweetalert');
// import swal from 'sweetalert';
@Injectable()
export class DocumnetService {

  constructor(private http: Http) { }


  getDocument() {
    return new Promise((resolve,reject)=>{
      this.http.get('http://localhost:8000/getDocument').map(res=>res.json())
      .subscribe((data)=>{
        resolve(data)
      },error=>{
        reject(error);
      })
    })
  }
  
  postDocument(data){
    return new Promise((resolve,reject)=>{
      let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
      let options = new RequestOptions({ headers: cpHeaders });
      console.log('success post doucument');
      this.http.post("http://localhost:8000/postDocument", JSON.stringify(data), options)
          .map(res => res.json())
          .subscribe((data)=>{
            resolve(data)
             swal("สำเร็จ!", "ดีใจด้วย", "success");
          },error=>{
            reject(error);
             swal("ไม่ได้!", "ทำใหม่นะ", "warning");
            //  alert('dd');
          });
    }); 

        
} 


}
