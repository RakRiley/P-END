import { Component, OnInit } from '@angular/core';
import { UserService } from '../service/user.service';
import { Http } from '@angular/http';
import {SignerService} from '../service/signer.service'
var swal = require('sweetalert');
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

link:number;
userData:any;
name:any = {name: ""};
Aname:any ="";
  constructor(private userService : UserService,
              private signerService : SignerService) { 
  this.link=1
  }  
  getUser(){
    this.userService.getUser().then((data:any)=>{
      if(data.status=='error'){
        console.log('ddd');
      }else{
        this.userData = data;
         console.log(this.userData);
      }
    });
  }


  si:any;
  getsigner(){
    this.signerService.getSigner().then((sig:any)=>{
      console.log(sig,'ดูชื่อ')
      this.si = sig
    });
  }


  putSigner() {
    var datat = {
      name : this.name.name
      
  };
    this.signerService.putSigner(datat,this.name.id).then((res)=>{
      if(res){
        swal("อัพเดทเรียบร้อย!", "เสร็จสิ้น", "success");
        this.name="";
      }
    })
    
           
  }

  postSigner(){
    var data ={
      name : this.Aname
    }
    this.signerService.postSigner(data).then((res)=>{
      if(res){
        swal("เพิ่มชื่อเรียบร้อย!", "เสร็จสิ้น", "success");
        this.Aname="";
      }
    })
  }


linkchange(number){
  this.link=number;
}


  ngOnInit() {
    this.getUser();
    this.getsigner();
  }

}
