import { Component, OnInit } from '@angular/core';
import { UserService } from '../service/user.service';
import { Http } from '@angular/http';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

link:number;
userData:any;
  constructor(private userService : UserService) { 
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




linkchange(number){
  this.link=number;
}
  ngOnInit() {
    this.getUser();
  }

}
