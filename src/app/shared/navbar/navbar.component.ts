import { Component, OnInit } from '@angular/core';
import {  Router } from '@angular/router';
import { JsonpModule } from '@angular/http';
import { parse } from 'url';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  is_login:boolean=false;
  constructor(public router:Router) {
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
    sn:string;
  showname(){
    let item = localStorage.getItem('user_profile')
    let obj = JSON.parse(item)
    console.log(obj)
    this.sn = obj

  }



  ngOnInit() {
    this.showname()
  }

}
