import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { throttle} from 'lodash'
import { UserService } from '../components/service/user.service';
import { forEach } from '@angular/router/src/utils/collection';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  private rak:string;
  tab:number;
  userData = [];
  ln : any;
  constructor(public param:ActivatedRoute,public router:Router, private userService : UserService) {
    if(!JSON.parse(localStorage.getItem('user_profile'))){
      this.router.navigate(['/login'])
   }
    this.tab=1 
    this.sname();
    this.getUser();
    console.log(this.ln.StudentCode);
  }

  getUser(){
    this.userService.getUser().then((data:any)=>{
      if(data.status=='error'){
        console.log('ddd');
      }else{
        this.userData = data;
        console.log('yes');
      }
    }).then((koy)=>{
      console.log(this.userData.length);
      var check = 0;
      for(var i=0;i<this.userData.length;i++){
        console.log(this.userData[i].student_code);
        if(this.ln.StudentCode == this.userData[i].student_code){
          console.log('OH YES'); 
          check = 1;
        }else{
          console.log('OH ON');
          check = 2;
        }
      }
      if(check==1){
        console.log('ีuser นี้มีในฐานข้อมูล');
      }else if(check==2){
        console.log("ีuser นี้ไม่มีในฐานข้อมูล");
          var data = {
            student_code: this.ln.StudentCode,
            firstname: this.ln.FirstName_TH,
            lastname: this.ln.LastName_TH,
            Role: this.ln.ProgramName_TH,
            prefix: this.ln.Title
          };
          this.userService.postUser(data);
      }
      // this.userData.forEach(user => {
        
      //   if(this.ln.StudentCode == user.student_code){
      //      console.log('yes student'); 
           
      //   }else{
      //       if(check){
      //         console.log('555');
      //         check = false;

      //       }

      //     }
      //   });
      });
  

  

  }
  sname(){
    let item = localStorage.getItem('user_profile')
    let obj = JSON.parse(item)
    console.log(obj)
    this.ln = obj
  }

  tabchange(number){
    this.tab=number;
  }
  collapse(kkk){

  }
  ngOnInit() {
   
    
  }
  showname(){
    
  }
    

}
