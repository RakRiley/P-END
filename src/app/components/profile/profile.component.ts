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
import {NgxPaginationModule} from 'ngx-pagination';
import {Observable} from 'rxjs/Observable';
import {debounceTime, distinctUntilChanged, map} from 'rxjs/operators';
import { Pipe, PipeTransform } from '@angular/core';
import { async } from '../../../../node_modules/@types/q';
import {environment} from '../../../environments/environment'
// import { FilterPipe } from '../filterpipe/filterpipe.component';
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
    private fileService: FileService) {

    if(localStorage.getItem('token')){
      this.p_login=true;
    }else{
      this.p_login=false;
    }
    
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
            })
          }
          reader.readAsDataURL(event.target.files[0]);
        
      // }
    }
  }


  datadoc : any;
  newdoc: any;
showdata(){
  this.newdoc = [];
  this.documentService.getDocument().then((doc:any)=>{
console.log("ตาราง1",doc);
this.datadoc=doc
  })
  this.dateService.getDate().then((date1:any)=>{
    date1.forEach(e => {
      this.datadoc.forEach(x => {
        if (e.id == x.date_id) {
          x.date_id = e;
        }
      }); 
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
    // this.baseinstates();
  }

}
