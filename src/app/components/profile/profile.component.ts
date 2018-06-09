import { Component, OnInit } from '@angular/core';
import {  Router } from '@angular/router';
import { JsonpModule } from '@angular/http';
import { parse } from 'url';
import { GetApiService } from '../../get-api.service';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  results = [];
  p_login:boolean=false;
  constructor(public router:Router, public getApiService:GetApiService) {
    if(localStorage.getItem('token')){
      this.p_login=true;
    }else{
      this.p_login=false;
    }
    //this.getUser();

   }

  // getUser(){
  //   this.getApiService.getAll().then((data:any)=>{
  //     if(data.status=='error'){
  //       console.log(data)
  //     }else{
  //       console.log(data)
  //     }
  //   })      
  // }

   ln:string;
   sname(){
     let item = localStorage.getItem('user_profile')
     let obj = JSON.parse(item)
     console.log(obj)
     this.ln = obj
   }

  ngOnInit() {
    this.sname()
  }

}
