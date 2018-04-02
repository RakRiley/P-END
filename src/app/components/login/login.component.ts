import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../provider/login/login.service'


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers:[LoginService]
})
export class LoginComponent implements OnInit {
  constructor(public loginprovider:LoginService) {

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
        this.loginprovider.getinfo(token[0].innerHTML).then((data1:any)=>{
          if(data.status=='error'){
            alert(data1)
          }else{
            var datareal = parser.parseFromString(data1,'text/xml')
            console.log(datareal)
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
