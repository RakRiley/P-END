import { Injectable} from '@angular/core';
import {Http,Response,Headers,RequestOptions, ResponseType} from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class LoginService {
  url ='localhost'
  constructor(private http: Http) { console.log('Heyyyyyyyyy');
  }
  login(username:string,password:string){
    var user = btoa(username)
    var pass = btoa(password)
    return new Promise((res,rej)=>{
      let header = new Headers({
        'Content-Type':'application/xml' 
      })
      let option = new RequestOptions({headers:header})
      this.http.get('https://ws.up.ac.th/mobile/AuthenService.asmx/Login?username='+user+'&password='+pass+'&platformName=1&deviceType=1&ProductName=1&ServiceUser=1&ServicePass=1')
      .map(res=> res.text())
      .subscribe(data=>{
          res((data))
        ,error=>{
          rej(error)
        }
      })
    })
  }

  getinfo(ses){
    return new Promise((res,rej)=>{
      let header = new Headers ({
        'Content-Type':'application/json'
       })
       
      let option = new RequestOptions({headers:header})
      console.log(option)
      this.http.post('https://ws.up.ac.th/mobile/StudentService.asmx/GetStudentInfo',{sessionID:ses},option)
      .map(res=>res.text())
      .subscribe(data=>{
        res((data)),
        error=>{
          rej(error)
        }
      })
  })           
  }
}