import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../provider/login/login.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers:[LoginService]
})
export class LoginComponent implements OnInit {
  constructor(public loginprovider:LoginService,public route:Router) {
     if(JSON.parse(localStorage.getItem('user_profile'))){
        this.route.navigate(['/'])
     }
   }

   Login(username,password){
     console.log(username,password)
     this.loginprovider.login(username,password).then((data:any)=>{
      if(data.status=='error'){
        alert(data)
      }else{
        var parser = new DOMParser();
        var xmltoken = parser.parseFromString(data,"text/xml");
        var token = xmltoken.getElementsByTagName('string')
        console.log(data)
        console.log(token[0].innerHTML)
        localStorage.setItem('token',token[0].innerHTML);
        this.loginprovider.getinfo(token[0].innerHTML).then((data1:any)=>{
          if(data.status=='error'){
            alert(data1)
            localStorage.removeItem('token');
          }else{
            let datareal = JSON.parse(data1)
            console.log(datareal.d)
            let profile = JSON.stringify(datareal.d);
            localStorage.setItem('user_profile',profile);
            this.route.navigate(['/'])
          }
        })
      }
      },(error)=>{
        alert(error)
      }
     )
   }

  ngOnInit() {
  }

}
