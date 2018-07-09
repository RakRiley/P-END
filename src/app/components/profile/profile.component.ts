import { Component, OnInit } from '@angular/core';
import {  Router } from '@angular/router';
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
import { FilterpipeComponent } from '../filterpipe/filterpipe.component';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  [x: string]: any;
  p: number = 1;
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
  searchText:any
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
   numPage(event){
    //  console.log((event-1)*5);
    this.numpage = (event-1)*10;
    // console.log(this.numpage);
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
   
  putFile(event,id): void{
    var dataf = {
      file : event.target.files
    };
    console.log(event.target.files)
    this.fileService.putFile(dataf,id)
    console.log(dataf,'ชื่อไฟล์')
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
        this.newdoc.push(sss);
      }
    });
    console.log("newdoc",this.datadoc);
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
    // this.baseinstates();
  }

}
