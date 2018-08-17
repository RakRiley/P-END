import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router, Data } from '@angular/router';
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
import { IMyDpOptions } from 'mydatepicker-thai';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import { async } from '../../../node_modules/@angular/core/testing';
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
  
  name :any ;
  formm :any ;
  to :any  ;
  sender:any;
  speed : any = "ปกติ";
  secret : any = "ปกติ";
  note : any ;
  practice :any ;
  date_time :any;
  date_book :any;
  date_id :any;
  id :any;
  user_id: any;
  checktable:number = 0;
  

  private monthname: { 1: "มกราคม",2: "กุมภาพันธ์", 3: "มีนาคม", 4: "เมษายน", 5: "พฤษภาคม", 6: "มิถุนายน",
   7: "กรกฎาคม", 8: "สิงหาคม", 9: "กันยายน", 10: "ตุลาคม", 11: "พฤศจิกายน", 12: "ธันวาคม" }

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
  public myDatePickerOptions: IMyDpOptions = {
    // other options...
    dateFormat: 'dd/mm/yyyy',
    dayLabels: { su: "อา", mo: "จ", tu: "อ", we: "พ", th: "พฤ", fr: "ศ", sa: "ส" },
    monthLabels: { 1: "ม.ค", 2: "ก.พ.", 3: "มี.ค.", 4: "เม.ย.", 5: "พ.ค.", 6: "มิ.ย.", 7: "ก.ค.", 8: "ส.ค.", 9: "ก.ย.", 10: "ต.ค.", 11: "พ.ย.", 12: "ธ.ค." },
    todayBtnTxt: "วันนี้",
    firstDayOfWeek: "su",
    sunHighlight: true,
    disableWeekends: true,
    
    // disableDateRanges: [{begin: {year: new Date().getFullYear() - 100, month: 1, day: 1}, end: {year: 2018, month: 8, day: 9}},{begin: {year: 2018, month: 8, day: 20}, end: {year: new Date().getFullYear() + 100, month: 8, day: 9}}]
  }

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
    
  }
  ngOnInit(){
    this.param.queryParams.subscribe(data => {
      if (data.number_of_book) {
        this.getParams();
      }
      else if (data.check==3) {
        this.getParamsDupNumBook();
      }
      else if (data.check==4) {
        this.getParamsNumC();
      }
      else {
        this.baseinstates();
        this.getDate();
        this.Fcount();
      }
      this.showiddoc();
      this.showiduser();
      this.getsigner();
      this.owndoc();
    })
    setInterval(() => { 
      this.getDate();
    }, 1000);
  }
  button_change: boolean;
  getParams() {
      this.param.queryParams.subscribe(data => {
        console.log("paramssss", data);
        
        if (data.check==1) {
          console.log("param after", data);
          var num = 4;
          this.NumberC = ('000'+data.number_of_book).slice(-num);
          this.speed = data.speed;
          this.secret = data.secret;
          this.formm = data.form;
          this.name = data.name;
          this.to = data.to;
          this.sender = data.sender;
          this.note = data.note;
          this.practice = data.practice;
          this.datepicker = { date : { year: data.year, month: data.month, day: data.day_time}};
          this.id = data.id,
          this.button_change = true;
          this.checktable = 1;
        }
        else if (data.check==2) {
          console.log("param after", data);
          var num = 4;
          this.NumberC = ('000'+data.number_of_book).slice(-num);
          this.speed = data.speed;
          this.secret = data.secret;
          this.formm = data.form;
          this.name = data.name;
          this.to = data.to;
          this.sender = data.sender;
          this.note = data.note;
          this.practice = data.practice;
          this.datepicker = { date : { year: data.year, month: data.month, day: data.day_time}};
          this.id = data.id,
          this.button_change = true;
          this.checktable = 2;
        }
         else {
          
          this.button_change = false;
          this.checktable = 0;
          
        }
      });
     
  }

  onClickReset(){
    this.datepicker=""
    this.name=""
    this.formm="เลือก..."
    this.to=""
    this.sender=""
    this.speed="ปกติ"
    this.secret="ปกติ"
    this.note =""
    this.practice =""
  }

  getParamsDupNumBook() {
    this.param.queryParams.subscribe(data => {
      if (data.numbook) {
        console.log("param numbook after", data);
        this.documnetService.getDocumentNumBook(data.numbook).then(numbook => {
          console.log("numbookkkkkkk", numbook);
          var num = 6;
          this.NumberB = (Number(numbook[0].number_of_book)+0.1).toFixed(1);
        
          console.log("this.NumberB", this.NumberB);
          this.NumberC = ('000'+this.NumberB).slice(-num);
          console.log("this.NumberC", this.NumberC);
          this.datepicker = { date : { year: data.year_time, month: data.month_time, day: data.day_time}};
        })
        this.checktable = 3;
        
      } else {

      }
    });
  }
  

  NumberB :any;
  Nbook:any = [];
  NumberC:any;
  getDoc() {
    
    this.documnetService.getDocument().then((data:any)=>{
      data.forEach(e => {
        this.Nbook.push(e.number_of_book);
      });
      console.log("Nbook before ",this.Nbook);
      this.Nbook = this.Nbook.sort();
      console.log("Nbook after ",this.Nbook);
      
      if (data.length==0) {
        this.NumberB = 1
      }
      else {
        console.log(this.Nbook[this.Nbook.length-1],'num of book')
        this.NumberB=this.Nbook[this.Nbook.length-1]+1
        console.log(this.NumberB,'new numbook')
      }
      var num = 4;
      this.NumberC = ('000'+this.NumberB).slice(-num);
      console.log("66666666666666666",this.NumberC)
    })
  }
  getDocDistinct() {
    this.documnetService.getDocumentDistinct().then((nfb:any)=>{
      console.log("nfb ", nfb);
      
      if (nfb.length==0) {
        if (this.Nbook.length==0) {
          this.NumberB = 1
        }
        else {
          this.NumberB=this.Nbook[this.Nbook.length-1]+1
        }
        var num = 4;
        this.NumberC = ('000'+this.NumberB).slice(-num)
      }
      else {
        nfb.forEach(x => {
          if (this.Nbook.indexOf(x.number_of_book)<0) {
            this.NumberB = x.number_of_book;
            return false
          }
        });
      }
      var num = 4;
      this.NumberC = ('000'+this.NumberB).slice(-num)
    })
  }
  async Fcount(){
    // const a = await this.getDoc();
    // const b = await this.getDocDistinct();
    this.documnetService.getDocumentnumN().then((data:any)=>{
      data.forEach(e => {
        this.Nbook.push(parseInt(e.number_of_book));
      });
      console.log("Nbook before ",this.Nbook);
      this.Nbook = this.Nbook.sort();
      console.log("Nbook after ",this.Nbook);
      
      if (data.length==0) {
        this.NumberB = 1
      }
      else {
        console.log(this.Nbook[this.Nbook.length-1],'num of book')
        this.NumberB=this.Nbook[this.Nbook.length-1]+1
        console.log(this.NumberB,'new numbook')
      }
      var num = 4;
      this.NumberC = ('000'+this.NumberB).slice(-num);
      console.log("66666666666666666",this.NumberC)
    })
  }
 si:any;
  getsigner(){
    this.signerService.getSigner().then((sig:any)=>{
      console.log(sig,'ดูชื่อ')
      this.si = sig
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
      this.user_id = x.id;
      }
    });
    console.log(this.user_id,'ผู้ที่ใช้งานอยู่ id');
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
          status:'1'
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
            return false;
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
              status:'1'
            };
            this.userService.postUser(data);
        }
      }
      });

  }
  sname(){
    let item = localStorage.getItem('user_profile')
    let obj = JSON.parse(item)
    console.log(obj)
    this.ln = obj
  }

  postDocumnet(){
    // console.log(this.sender.id)   
      var iddate
      this.dateService.getDate().then((hhh : any)=>{
        console.log(hhh);
        console.log(this.datepicker,'เวลาลง'); 
        // if (this.mounth == 1) {
        //   this.mounth = 'มกราคม';
        // }
        // else if (this.mounth == 2) {
        //   this.mounth = 'กุมภาพันธ์';
        // }
        // else if (this.mounth == 3) {
        //   this.mounth = 'มีนาคม';
        // } 
        // else if (this.mounth == 4) {
        //   this.mounth = 'เมษายน';
        // } 
        // else if (this.mounth == 5) {
        //   this.mounth = 'พฤษภาคม';
        // } 
        // else if (this.mounth == 6) {
        //   this.mounth = 'มิถุนายน';
        // } 
        // else if (this.mounth == 7) {
        //   this.mounth = 'กรกฎาคม';
        // } 
        // else if (this.mounth == 8) {
        //   this.mounth = 'สิงหาคม';
        // } 
        // else if (this.mounth == 9) {
        //   this.mounth = 'กันยายน';
        // } 
        // else if (this.mounth == 10) {
        //   this.mounth = 'ตุลาคม';
        // } 
        // else if (this.mounth == 11) {
        //   this.mounth = 'พฤศจิกายน';
        // } 
        // else if (this.mounth == 12) {
        //   this.mounth = 'ธันวาคม';
        // } 
        if(hhh.length>0&&hhh[hhh.length-1].id) { iddate=hhh[hhh.length-1].id+1; } else { iddate = 1 }
        
         var dataD = {
          date_id : iddate,
          name : this.name,
          form : this.formm,
          to : this.to,
          sender : this.sender,
          user_id : this.user_id,
          speed : this.speed,
          secret : this.secret,
          status : "U",
          practice : this.practice,
          note : this.note,
          number_of_book :this.NumberB
      };
      if(this.datepicker&&this.name&&this.formm&&this.to&&this.sender&&this.speed&&this.secret){
         this.documnetService.postDocument(dataD).then(e => {
          if (e) {
            
            var dataBook ={
              id: iddate,
              day : this.date,
              month : this.mounth,
              year : this.year,
              hour : this.hour,
              minute : this.minute,
              second : this.second,
              day_time : this.datepicker.date.day,
              mounth_time : this.datepicker.date.month,
              year_time : this.datepicker.date.year
             };
             var id : any;
             console.log(dataBook);
             this.dateService.postDate(dataBook).then((data:any)=>{
              console.log(data.id);
                  this.Fcount()
                  this.datepicker=""
                  this.name=""
                  this.formm="เลือก..."
                  this.to=""
                  this.sender=""
                  this.speed="ปกติ"
                  this.secret="ปกติ"
                  this.note =""
                  this.practice =""
             });
            swal("เรียบร้อย!", "เสร็จสิ้น", "success");
            
          }
        });
        }else{
          swal("ไม่ได้!", "กรุณากรอกข้อมูลให้ครบถ้วน", "warning");
        }
      });
        
    
  }

  putDocumnet(id) {
    var datat = {
      
      name : this.name,
      form : this.formm,
      to : this.to,
      sender : this.sender,
      user_id : this.user_id,
      speed : this.speed,
      secret : this.secret,
      status : "U",
      practice : this.practice,
      note : this.note,
      number_of_book :this.NumberB
  };
    this.documnetService.putDocument(datat,this.id).then((res)=>{
      if(res){
        console.log("ได้",this.id);
      }
    })
    swal("อัพเดทเรียบร้อย!", "เสร็จสิ้น", "success");
    this.datepicker=""
              this.name=""
              this.formm="เลือก..."
              this.to=""
              this.sender=""
              this.speed="ปกติ"
              this.secret="ปกติ"
              this.note =""
              this.practice =""

  this.router.navigate(["profile"]);
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
  month4show:string;
  getDate(){
    var d = new Date();
    this.date= d.getDate();
  //   if(this.date<10) {
  //     this.date = '0'+ this.date
  // } 
 
    this.mounth = d.getMonth()+1;
    if (this.mounth == 1) {
      this.month4show = 'มกราคม';
    }
    else if (this.mounth == 2) {
      this.month4show = 'กุมภาพันธ์';
    }
    else if (this.mounth == 3) {
      this.month4show = 'มีนาคม';
    } 
    else if (this.mounth == 4) {
      this.month4show = 'เมษายน';
    } 
    else if (this.mounth == 5) {
      this.month4show = 'พฤษภาคม';
    } 
    else if (this.mounth == 6) {
      this.month4show = 'มิถุนายน';
    } 
    else if (this.mounth == 7) {
      this.month4show = 'กรกฎาคม';
    } 
    else if (this.mounth == 8) {
      this.month4show = 'สิงหาคม';
    } 
    else if (this.mounth == 9) {
      this.month4show = 'กันยายน';
    } 
    else if (this.mounth == 10) {
      this.month4show = 'ตุลาคม';
    } 
    else if (this.mounth == 11) {
      this.month4show = 'พฤศจิกายน';
    } 
    else if (this.mounth == 12) {
      this.month4show = 'ธันวาคม';
    }
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

  getParamsNumC() {
    this.param.queryParams.subscribe(data => {
      if (data.check==4) {
        console.log("param numbook cancel", data);
        var num = 6;
        this.NumberC = ('000'+data.numbook).slice(-num);
        this.myDatePickerOptions = {
          // other options...
          disableWeekends: true,
          disableDateRanges: [{begin: {year: new Date().getFullYear() - 100, month: 1, day: 1}, end: {year: data.year1, month: data.month1, day: Number(data.day1)-1}},{begin: {year: data.year2, month: data.month2, day: Number(data.day2)+1}, end: {year: new Date().getFullYear() + 100, month: 12, day: 31}}]          
        }
        this.checktable = 4;
        this.id=data.id
      } else {

      }
    });
  }


  // NumberN:any;
  // getDocumentnumN(){
  //   this.documnetService.getDocumentnumN().then((nb:any)=>{
  //     console.log("nb ", nb);
  //     var num = 4;
  //     this.NumberN = ('000'+this.NumberB).slice(-num);
  //     console.log("เลขหนังสือใหม่",this.NumberN)
  //   })
    
  // }


}
