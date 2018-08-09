import { Component, OnInit } from '@angular/core';
import {  Router } from '@angular/router';
import { JsonpModule } from '@angular/http';
import { parse } from 'url';
import { AdminService } from '../../components/service/admin.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  is_login:boolean=false;
  constructor(public router:Router,
              private adminService: AdminService) {
    if(localStorage.getItem('token')){
      this.is_login=true;
    }else{
      this.is_login=false;
    }

    }

  
  goTo(input){
    this.router.navigate(['home'])
    if(input==1){
      window.scroll(0,140)
    }else if(input==2){
      window.scroll(0,1175)
    }else{
      window.scroll(0,0)
    }
    
  }

  logout(){
    localStorage.removeItem('user_profile');
    localStorage.removeItem('token');
    this.router.navigate(['/login'])
  }
    sn:any;
  showname(){
    let item = localStorage.getItem('user_profile')
    let obj = JSON.parse(item)
    this.sn = obj
    this.adminService.getAdmin().then((data: any) => {
      data.forEach(e => {
        if (JSON.stringify(e.student_code) == this.sn.StudentCode) {
          this.sn["Status"] = "Admin";
        } else {
          this.sn["Status"] = "User";
        }
      });
      console.log("sn=>",this.sn);
      localStorage.setItem('user_profile',JSON.stringify(this.sn));
      
    })

  }



  ngOnInit() {
    this.showname()
  }

}
