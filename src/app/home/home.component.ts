import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { FormsModule } from '@angular/forms'
import { UserService } from '../components/service/user.service';
import { forEach } from '@angular/router/src/utils/collection';
import { DocumnetService } from '../components/service/documnet.service';
import { not } from '@angular/compiler/src/output/output_ast';
import { Http } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { ElementRef, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
 var swal = require('sweetalert');
import { DateService } from '../components/service/date.service';
import { SignerService } from '../components/service/signer.service';
import { getLocaleMonthNames } from '@angular/common';
import { MAX_LENGTH_VALIDATOR } from '@angular/forms/src/directives/validators';
import {Observable} from 'rxjs/Observable';
import {debounceTime, distinctUntilChanged, map} from 'rxjs/operators';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
declare var $: any;
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
  
  name :any = null;
  formm :any = 'เลือก...';
  to :any = null ;
  sender:any = null;
  speed : any = 'ปกติ';
  secret : any = 'ปกติ';
  note : any = "";
  practice :any ="" ;
  date_time :any;
  date_book :any;
  date_id :any;
  id :any;

  private day: any;
  private date:any;
  private mounth:any;
  private year:any;
  private hour:any;
  private minute:any;
  private second:any;

  private datepicker:any ;

  private states = [];

  //  'Alabama', 'Alaska', 'American Samoa', 'Arizona', 'Arkansas', 'California', 'Colorado',
  // 'Connecticut', 'Delaware', 'District Of Columbia', 'Federated States Of Micronesia', 'Florida', 'Georgia',
  // 'Guam', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine',
  // 'Marshall Islands', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana',
  // 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota',
  // 'Northern Mariana Islands', 'Ohio', 'Oklahoma', 'Oregon', 'Palau', 'Pennsylvania', 'Puerto Rico', 'Rhode Island',
  // 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virgin Islands', 'Virginia',
  // 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'

  constructor(public param:ActivatedRoute,public router:Router, 
    private userService : UserService, 
    private documnetService : DocumnetService, 
    private http :HttpClient, 
    private dateService : DateService,
    private signerService : SignerService) {
    if(!JSON.parse(localStorage.getItem('user_profile'))){
      this.router.navigate(['/login'])
   }
    this.tab=1
    this.sname();
    this.getUser();
    console.log(this.ln.StudentCode);
    // this.postDocumnet();
    
  }
  ngOnInit(){
    this.Fcount();
    this.getsigner();
    this.owndoc();
    this.baseinstates();
    this.showiddoc();
    this.showiduser();
    this.getDate();
    setInterval(() => { 
      this.getDate();
    }, 1000);
  }
  // datePicker(event) {
  //   console.log("time1=",event.target.value);
  //   var date = event.target.value;
  //   $(".datepicker").datetimepicker({
  //     timepicker:false,
  //     lang:'th',  // แสดงภาษาไทย
  //     inline:true
  //   });
  //   console.log("time2=",date);
    
    
  // }

  NumberB :any;
  Nbook:any;
  Fcount(){
  this.documnetService.getDocument().then((nfb:any)=>{
    this.Nbook = nfb
    if (nfb.length==0) {
      this.NumberB = 1
    }
    else {
      console.log(this.Nbook[this.Nbook.length-1],'num of book')
      this.NumberB=this.Nbook[this.Nbook.length-1].number_of_book+1
      console.log(this.NumberB,'new numbook')
    }
    
  })
  }

  getsigner(){
    this.signerService.getSigner().then((sig:any)=>{
      console.log(sig,'ดูชื่อ')
    });
  }
  // ใช้ในการเลือกชื่อ
  // [ngbTypeahead]="search" [resultTemplate]="rt" [inputFormatter]="formatter"
  baseinstates(){
    this.signerService.getSigner().then((san:any)=>{
      console.log(san,'เลือก')
      san.forEach(e => {
        this.states.push(e.name)
        // this.states.push(e.lastname)
      });
      console.log(this.states,'เลือกชื่อ');  
    });
    
  }


  owndoc(){
  this.userService.getUser().then((user:any) => {
    console.log("UserID=>",user);
    user.forEach(x => {
      if (this.ln.StudentCode==JSON.stringify(x.student_code)) {
      //  this.userID = x.id;
      this.id = x.id;
      }
    });
    console.log(this.id,'ผู้ที่ใช้งานอยู่ id');
  })
  }

  idnum : any;
  showiduser(){
    this.userService.getUser().then((iddata:any)=>{
      console.log(iddata.length,'จำนวนidของผู้ใช้');
      this.idnum=iddata.length;
    });
  }

  iddocc : any;
  showiddoc(){
    this.documnetService.getDocument().then((docmuid :any)=>{
      console.log(docmuid.length,'จำนวนหนังสือ');
      this.iddocc=docmuid.length;
    });
  }

  search = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map(term => term === '' ? this.states
        : this.states.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
    );

  
  // search = (text$: Observable<string>) =>
  //   text$
  //     .debounceTime(200)
  //     .distinctUntilChanged()
  //     .map(term => term === '' ? [] //term.length < 2 = kicks in only if 2+ characters typed
  //       : this.states.filter(v => v.)
  //       : this.states.filter(v => v.filter(x => x.waypoint.toLowerCase().indexOf(term.toLowerCase()) > -1).length > 0));


  test(){
    console.log(this.datepicker);
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
      if (this.userData.length==0) {
        var data = {
          student_code: this.ln.StudentCode,
          firstname: this.ln.FirstName_TH,
          lastname: this.ln.LastName_TH,
          Role: this.ln.ProgramName_TH,
          prefix: this.ln.Title,
          status:'222222'
        };
        this.userService.postUser(data);
      }
      else {
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
          console.log('user นี้มีในฐานข้อมูล');
        }else if(check==2){
          console.log( "user นี้ไม่มีในฐานข้อมูล");
            var data = {
              student_code: this.ln.StudentCode,
              firstname: this.ln.FirstName_TH,
              lastname: this.ln.LastName_TH,
              Role: this.ln.ProgramName_TH,
              prefix: this.ln.Title,
              status:'222222'
            };
            this.userService.postUser(data);
        }
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

  postDocumnet(){
    console.log(this.sender.id)
    if(this.datepicker&&this.name&&this.formm&&this.to&&this.sender&&this.speed&&this.secret){
      var iddate
      this.dateService.getDate().then((hhh : any)=>{
        console.log(hhh);
        if(hhh.length>0&&hhh[hhh.length-1].id) { iddate=hhh[hhh.length-1].id+1; } else { iddate = 1 }
        var dataBook ={
          id: iddate,
          day : this.date,
          month : this.mounth,
          year : this.year,
          hour : this.hour,
          minute : this.minute,
          second : this.second,
          day_time : this.datepicker.substring(8 ,10),
          mounth_time : this.datepicker.substring(5 ,7),
          year_time : this.datepicker.substring(0 ,4)
         };
         var id : any;
         console.log(dataBook);
         this.dateService.postDate(dataBook).then((data:any)=>{
          console.log(data.id);
  
                        var dataD = {
                  date_id : iddate,
                  name : this.name,
                  form : this.formm,
                  to : this.to,
                  sender : this.sender,
                  user_id : this.id,
                  speed : this.speed,
                  secret : this.secret,
                  practice : this.practice,
                  note : this.note,
                  number_of_book :this.NumberB
                
              };
              console.log(this.name)
              console.log(this.formm)
              console.log(this.to)
              console.log(this.sender)
              console.log(this.secret)
              console.log(this.speed)
              console.log(this.note)
              console.log(this.practice)
              
              this.documnetService.postDocument(dataD)
              this.datepicker=""
              this.name=""
              this.formm="เลือก..."
              this.to=""
              this.sender=""
              this.speed="ปกติ"
              this.secret="ปกติ"
              this.note = ""
              this.practice =""
         });
         swal("ได้!", "เสร็จสิ้น", "success");
      });
        
    }else{
      swal("ไม่ได้!", "กรุณากรอกข้อมูลให้ครบถ้วน", "warning");
    }

        

  }

 
  tabchange(number){
    this.tab=number;
  }
 
  onFileChange(event) {
  
  }

  onUpload(){

  }

  collapse(kkk){

  }
  showname(){

  }
  getDate(){
    var d = new Date();
    this.date= d.getDate();
  //   if(this.date<10) {
  //     this.date = '0'+ this.date
  // } 
 
    this.mounth = d.getMonth()+1;
  //  if(this.mounth<10) {
  //   this.mounth = '0'+ this.mounth
  //  }
    this.year = d.getFullYear()+543;
    this.hour = d.getHours();
    this.minute = d.getMinutes();
    this.second = d.getSeconds()
    // console.log(this.date)
    // console.log(this.mounth)
    // console.log(this.year)
    // console.log(this.hour)
    // console.log(this.minute)
    // console.log(this.second)

  }


}
