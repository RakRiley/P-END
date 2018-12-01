import { Component, OnInit } from '@angular/core';
import {  Router, NavigationExtras } from '@angular/router';
import { JsonpModule } from '@angular/http';
import { parse } from 'url';
import { GetApiService } from '../../get-api.service';
import 'rxjs/add/operator/map';
import { UserService } from '../service/user.service';
import { DateService } from '../service/date.service';
import { DocumnetService } from '../service/documnet.service';
import { FileService } from '../service/file.service';
import { YearPegService } from '../service/year-peg.service';
import {Observable} from 'rxjs/Observable';
import {debounceTime, distinctUntilChanged, map} from 'rxjs/operators';
import { Pipe, PipeTransform } from '@angular/core';
import { async } from '../../../../node_modules/@types/q';
import {environment} from '../../../environments/environment'
// import { FilterPipe } from '../filterpipe/filterpipe.component';
import { NgxDrpOptions, PresetItem, Range } from 'ngx-mat-daterange-picker';
var swal = require('sweetalert');
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  [x: string]: any;
  p: number = 1;
  urlapi = environment.api
  numpage: number = 0;
  page = 1;
  results = [];
  p_login:boolean=false;
  private states = [];
   useDataP =[];
  file : any;
  characters = [
    'Finn the human',
    'Jake the dog',
    'Princess bubblegum',
    'Lumpy Space Princess',
    'Beemo1',
    'Beemo2'
  ]
  searchText:any;
  admin:boolean;
  constructor(
    public router:Router, 
    public getApiService:GetApiService, 
    private userService : UserService , 
    private dateService : DateService , 
    private documentService : DocumnetService,
    private fileService: FileService,
    private year_pegService :YearPegService) {

    if(localStorage.getItem('token')){
      this.p_login=true;
    }else{
      this.p_login=false;
    }

    const today = new Date();
    const fromMin = new Date(today.getFullYear(), today.getMonth()-2, 1);
    const fromMax = new Date(today.getFullYear(), today.getMonth()+1, 0);
    const toMin = new Date(today.getFullYear(), today.getMonth()-1, 1);
    const toMax = new Date(today.getFullYear(), today.getMonth()+2, 0);
    this.setupPresets();
    this.options = {
                    presets: this.presets,
                    format: 'mediumDate',
                    range: {fromDate:today, toDate: today},
                    applyLabel: "Submit",                
                  };
    
   }

   


   range:Range = {fromDate:new Date(), toDate: new Date()};
   options:NgxDrpOptions;
   presets:Array<PresetItem> = [];
   B:any
 
   updateRange(range: Range){
     this.len = range;
   }  
 
   setupPresets() {
  
     const backDate = (numOfDays) => {
       const today = new Date();
       return new Date(today.setDate(today.getDate() - numOfDays));
     }
     
     const today = new Date();
     const yesterday = backDate(1);
     const minus7 = backDate(7)
     const minus30 = backDate(30);
     const currMonthStart = new Date(today.getFullYear(), today.getMonth(), 1);
     const currMonthEnd = new Date(today.getFullYear(), today.getMonth()+1, 0);
     const lastMonthStart = new Date(today.getFullYear(), today.getMonth()-1, 1);
     const lastMonthEnd = new Date(today.getFullYear(), today.getMonth(), 0);
     
     this.presets =  [
       {presetLabel: "Yesterday", range:{ fromDate:yesterday, toDate:today }},
       {presetLabel: "Last 7 Days", range:{ fromDate: minus7, toDate:today }},
       {presetLabel: "Last 30 Days", range:{ fromDate: minus30, toDate:today }},
       {presetLabel: "This Month", range:{ fromDate: currMonthStart, toDate:currMonthEnd }},
       {presetLabel: "Last Month", range:{ fromDate: lastMonthStart, toDate:lastMonthEnd }}
     ]
   }
   

   A:any
   showstatus(){
     let item = localStorage.getItem('user_profile')
     let obj = JSON.parse(item)
     this.A = obj
     if(this.A.Status == "Admin"){
       this.admin = true;
     }else{
       this.admin = false;
     }
     console.log("Admin=>",this.admin);
     
 
   }


   numPage(event){
    //  console.log((event-1)*5);
    this.numpage = (event-1)*10;
    // console.log(this.numpage);
   }

   goToHome(data) {
    let navigationExtras: NavigationExtras = {
      queryParams: {
        created_at: data.created_at,
        date_created_at: data.date_id.created_at,
        day: data.date_id.day,
        day_time: data.date_id.day_time,
        date_deleted_at: data.date_id.deleted_at,
        hour: data.date_id.hour,
        date_id: data.date_id.id,
        minute: data.date_id.minute,
        month: data.date_id.month,
        mounth_time: data.date_id.mounth_time,
        second: data.date_id.second,
        date_updated_at: data.date_id.updated_at,
        year: data.date_id.year,
        year_time: data.date_id.year_time,
        deleted_at: data.deleted_at,
        form: data.form,
        id: data.id,
        name: data.name,
        note: data.note,
        number_of_book: data.number_of_book,
        practice: data.practice,
        secret: data.secret,
        sender: data.sender,
        speed: data.speed,
        status: data.status,
        to: data.to,
        updated_at: data.updated_at,
        user_id: data.user_id,
        check :1
      },
      skipLocationChange : true
    };    
    this.router.navigate(["home"], navigationExtras);
  }

    
   //  [ngbTypeahead]="search"
    // baseinstates(){
    //   this.documentService.getDocument().then((san:any)=>{
    //     console.log(san,'ค้นหา')
    //     san.forEach(e => {
    //       this.states.push(e.name)
    //       // this.states.push(e.lastname)
    //     });
    //     console.log(this.states,'ค้นหาข้อมูล');  
    //   });
      
    // }
  
    // search = (text$: Observable<string>) =>
    // text$.pipe(
    //   debounceTime(200),
    //   distinctUntilChanged(),
    //   map(term => term === '' ? this.states
    //     : this.states.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
    // );

  // transform(items: any[], searchText: string): any[] {
  //     if(!items) return [];
  //     if(!searchText) return items;
  // searchText = searchText.toLowerCase();
  // return items.filter( it => {
  //       return it.toLowerCase().includes(searchText);
  //     });
  //    }
   
  // putFile(event,id): void{
  //   var dataf = {
  //     file : event.target.files
  //   };
  //   console.log(event.target.files)
  //   this.fileService.putFile(dataf,id)
  //   console.log(dataf,'ชื่อไฟล์')
  // }

  // putFile(event,id): void{  
  //       if(event.target.file&&event.target.file[0]){
  //       var is_image_type_size:boolean
  //       is_image_type_size = this.FiluploadProvider.check_image_image_type_size(event.target.files)

  //       if(is_image_type_size==true){
  //       var reader = new FileReader();
        
  //       reader.onload = (event:any) => {
  //       this.addgapstandardform.img = event.target.result;
  //       }
        
  //       reader.readAsDataURL(event.target.files[0]);
  //       console.log(reader)
  //       }
        
  //     }
  //   }
  openfile(filepath){
    window.open(this.urlapi+'/'+filepath);
  }

  FF :any
  getFile(){
    this.fileService.getFile().then((F:any)=>{
        console.log('ไฟล์',F)
        this.FF=F
    })
  }

  putFile(event,id){
        if(event.target.files){
          // console.log(event.target.files[0]);
          
        // var is_image_type_size:boolean
        // is_image_type_size = this.fileuploadProvider.check_image_type_size(event.target.files)
        // if(is_image_type_size==true){
        var reader = new FileReader();
        
        // this.filename = event.target.files[0].name
        
          reader.onload = ($event:any)=>{
            this.file = $event.target.result;
            // console.log(this.file);
            
            this.fileService.putFile(this.file, id).then(res => {
              if(res) {
                console.log("Add file success");  
                swal("อัพโหลดเรียบร้อย!", "เสร็จสิ้น", "success");
              }
              this.showdata()
            })
          }
          reader.readAsDataURL(event.target.files[0]);
        
      // }
    }
  }
  NBR:any;
  goToHomeDupNumBook(num_book, data) {
    console.log("goToHomeDupNumBook ", num_book);
    console.log("dataaaaaaaaa333 ", data);
    this.documentService.getNumber_of_book_repeatedly(parseInt(num_book)).then((nbr:any)=>{
      this.NBR = nbr
      console.log("NBR ",this.NBR);
      
      if (this.NBR.length==6) {
        // alert("55555555555555555555555555");
        swal("ไม่ได้!", "จำนวนเลขถึงขีดจำกัด", "warning");
      }
      else{
        var num = num_book.toLocaleString();
        num = num.split(".");
        num = Number(num[0]);
        
        let navigationExtras: NavigationExtras = {
          queryParams: {
            numbook: num,
            day_time: data.day_time,
            month_time: data.mounth_time,
            year_time: data.year_time,
            check: 3
          },
          skipLocationChange : true
        };    
        this.router.navigate(["home"], navigationExtras);
      }
    })
  }

  D;
  DD;
  i;
  getYear_peg(){
    this.year_pegService.getYear_peg().then((yp:any)=>{
        this.numpeg = yp;
        this.numpeg.forEach(e => {
          if (new Date().getFullYear() == e.year_change) {
            this.nuu = e.peg_change;
            return false;
          }
        });
     
    })
  }  

  text:any="";
  type:any="";
  len:any=null;
  postDocumentsearch(){
    this.showdata()
  }


  numpeg;
  nuu
  datadoc : any;
  newdoc: any;
showdata(){
  this.newdoc = [];
  this.documentService.postDocumentsearch(this.type,this.text,this.len).then((doc:any)=>{
console.log("ตาราง1",doc);
this.datadoc=doc
this.datadoc.sort((a, b) => {
  if (a.number_of_book < b.number_of_book) {
    return -1;
  } else if (a.number_of_book > b.number_of_book) {
    return 1;
  } else {
    return 0;
  }
});
  })
  this.dateService.getDate().then((date1:any)=>{
    date1.forEach(e => {
      this.datadoc.forEach(x => {
        if (e.id == x.date_id) {
          x.date_id = e;
        }
      }); 
    });
    this.year_pegService.getYear_peg().then((yp:any)=>{
      this.numpeg = yp;
      this.numpeg.forEach(e => {
        if (new Date().getFullYear()+543 == e.year_change) {
          this.nuu = e.peg_change;
          return false;
        }
      });
      this.newdoc.forEach(e => {
        if (Number(e.number_of_book) === e.number_of_book && e.number_of_book % 1 === 0) {
          e.number_of_book = ('0000000'+e.number_of_book).slice(-this.nuu)
        }
        else {
          e.number_of_book = ('0000000'+e.number_of_book).slice(-this.nuu-2)
        }
      });
      console.log("showww",this.newdoc);  
      
    });
    this.datadoc.forEach(sss=>{
      if(sss.user_id == this.userID){
        // if (sss.date_id.mounth_time == "1") {
        //   sss.date_id.mounth_time = 'มกราคม';
        // }
        // else if (sss.date_id.mounth_time == "2") {
        //   sss.date_id.mounth_time = 'กุมภาพันธ์';
        // }
        // else if (sss.date_id.mounth_time == "3") {
        //   sss.date_id.mounth_time = 'มีนาคม';
        // } 
        // else if (sss.date_id.mounth_time == "4") {
        //   sss.date_id.mounth_time = 'เมษายน';
        // } 
        // else if (sss.date_id.mounth_time == "5") {
        //   sss.date_id.mounth_time = 'พฤษภาคม';
        // } 
        // else if (sss.date_id.mounth_time == "6") {
        //   sss.date_id.mounth_time = 'มิถุนายน';
        // } 
        // else if (sss.date_id.mounth_time == "7") {
        //   sss.date_id.mounth_time = 'กรกฎาคม';
        // } 
        // else if (sss.date_id.mounth_time == "8") {
        //   sss.date_id.mounth_time = 'สิงหาคม';
        // } 
        // else if (sss.date_id.mounth_time == "9") {
        //   sss.date_id.mounth_time = 'กันยายน';
        // } 
        // else if (sss.date_id.mounth_time == "10") {
        //   sss.date_id.mounth_time = 'ตุลาคม';
        // } 
        // else if (sss.date_id.mounth_time == "11") {
        //   sss.date_id.mounth_time = 'พฤศจิกายน';
        // } 
        // else if (sss.date_id.mounth_time == "12") {
        //   sss.date_id.mounth_time = 'ธันวาคม';
        // }
        this.newdoc.push(sss);
      }
      
    });
    console.log("newdoc",this.newdoc);
    console.log("ตาราง2",date1);
  })
  // this.userService.getUser().then((use:any)=>{
  //   console.log('ตารางสาม',use);
  // })
}

   ln:any;
   userID:any;
   sname(){
     let item = localStorage.getItem('user_profile')
     let obj = JSON.parse(item)
     console.log(obj)
     this.ln = obj

     this.userService.getUser().then((user:any) => {
       console.log("UserID=>",user);
       user.forEach(user => {
         if (this.ln.StudentCode==JSON.stringify(user.student_code)) {
          this.userID = user.id;
         }
       });
       console.log(this.userID);
     })
   }

  ngOnInit() {
    this.sname();
    this.showdata();
    this.showstatus();
    this.getYear_peg();
    // this.baseinstates();
    this.setupPresets();
  }

}
