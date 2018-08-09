import { Component, OnInit } from '@angular/core';
import {  Router, NavigationExtras } from '@angular/router';
// import { GetApiService } from '../../get-api.service';
import { Http }       from '@angular/http';
import {FileService} from '../service/file.service'
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { DocumnetService } from '../service/documnet.service';
import { DateService } from '../service/date.service';
import {environment} from '../../../environments/environment'
@Component({
  selector: 'app-table-1',
  templateUrl: './table-1.component.html',
  styleUrls: ['./table-1.component.css']
})
export class Table1Component implements OnInit {
  admin :boolean;
  numpage: number = 0;
  data:any;
  file:any;
  urlapi = environment.api
  constructor(private http: Http, 
  public router:Router, 
  private documentService : DocumnetService, 
  private dateService : DateService,
  private fileService : FileService) { 
  
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

  }
  
  numPage(event){
    
    this.numpage = (event-1)*10;
    
   }

   openfile(filepath){
    window.open(this.urlapi+'/'+filepath);
  }


  putstatus(id){
      console.log("id xxxx", id);
      
      var status = {status: "C"};
      this.documentService.putStatusDocument(status,id).then(res => {
        if(res) {
          console.log("Add status success");  
        }
        this.Showdatatable();
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
        //  console.log(this.file);
        
        this.fileService.putFile(this.file, id).then(res => {
          if(res) {
            console.log("Add file success");  
          }
          this.Showdatatable();
        })
      }
      reader.readAsDataURL(event.target.files[0]);
    
  // }
      }
      
  }




    show : any;
  Showdatatable(){
    this.documentService.getDocument().then((docc:any)=>{
      console.log(docc,'ข้อมูลของตารางdoc')
      this.show=docc;
      this.show.sort((a, b) => {
        if (a.number_of_book < b.number_of_book) {
          return -1;
        } else if (a.number_of_book > b.number_of_book) {
          return 1;
        } else {
          return 0;
        }
      });
    });
    
    // this.dateService.getDate().then((dataa:any)=>{
    //   dataa.forEach(t => {
    //     this.show.forEach(l => {
    //       if(t.id == l.date_id){
    //         l.date_id = t;
    //          if (l.date_id.month == 1) {
    //       l.date_id.month = 'มกราคม';
    //     }
    //     else if (l.date_id.month == 2) {
    //       l.date_id.month = 'กุมภาพันธ์';
    //     }
    //     else if (l.date_id.month == 3) {
    //       l.date_id.month = 'มีนาคม';
    //     } 
    //     else if (l.date_id.month == 4) {
    //       l.date_id.month = 'เมษายน';
    //     } 
    //     else if (l.date_id.month == 5) {
    //       l.date_id.month = 'พฤษภาคม';
    //     } 
    //     else if (l.date_id.month == 6) {
    //       l.date_id.month = 'มิถุนายน';
    //     } 
    //     else if (l.date_id.month == 7) {
    //       l.date_id.month = 'กรกฎาคม';
    //     } 
    //     else if (l.date_id.month == 8) {
    //       l.date_id.month = 'สิงหาคม';
    //     } 
    //     else if (l.date_id.month == 9) {
    //       l.date_id.month = 'กันยายน';
    //     } 
    //     else if (l.date_id.month == 10) {
    //       l.date_id.month = 'ตุลาคม';
    //     } 
    //     else if (l.date_id.month == 11) {
    //       l.date_id.month = 'พฤศจิกายน';
    //     } 
    //     else if (l.date_id.month == 12) {
    //       l.date_id.month = 'ธันวาคม';
    //     }
    //       }
    //     });
    //   });
    //   console.log(dataa,'ข้อมูลของตารางdate')
    // });
  }

  btnStatus:boolean = false;
  changeDocUC(chk: number) {
    if (chk == 0) {
      this.ShowdataC();
      this.btnStatus = true;
    }
    else {
      this.Showdatatable();
      this.btnStatus = false;
    }
  }
  ShowdataC(){
    this.documentService.getDocumentC().then((docc:any)=>{
      console.log(docc,'ข้อมูลของตารางdoc')
      this.show=docc;
    });
    
    // this.dateService.getDate().then((dataa:any)=>{
    //   dataa.forEach(t => {
    //     this.show.forEach(l => {
    //       if(t.id == l.date_id){
    //         l.date_id = t;
    //          if (l.date_id.month == 1) {
    //       l.date_id.month = 'มกราคม';
    //     }
    //     else if (l.date_id.month == 2) {
    //       l.date_id.month = 'กุมภาพันธ์';
    //     }
    //     else if (l.date_id.month == 3) {
    //       l.date_id.month = 'มีนาคม';
    //     } 
    //     else if (l.date_id.month == 4) {
    //       l.date_id.month = 'เมษายน';
    //     } 
    //     else if (l.date_id.month == 5) {
    //       l.date_id.month = 'พฤษภาคม';
    //     } 
    //     else if (l.date_id.month == 6) {
    //       l.date_id.month = 'มิถุนายน';
    //     } 
    //     else if (l.date_id.month == 7) {
    //       l.date_id.month = 'กรกฎาคม';
    //     } 
    //     else if (l.date_id.month == 8) {
    //       l.date_id.month = 'สิงหาคม';
    //     } 
    //     else if (l.date_id.month == 9) {
    //       l.date_id.month = 'กันยายน';
    //     } 
    //     else if (l.date_id.month == 10) {
    //       l.date_id.month = 'ตุลาคม';
    //     } 
    //     else if (l.date_id.month == 11) {
    //       l.date_id.month = 'พฤศจิกายน';
    //     } 
    //     else if (l.date_id.month == 12) {
    //       l.date_id.month = 'ธันวาคม';
    //     }
    //       }
    //     });
    //   });
    //   console.log(dataa,'ข้อมูลของตารางdate')
    // });
  }

  // getData() {
 
  //   // this.data = this.http.get('localhost:8000/get')
  //   //     .map(response => response.json());
  //   // console.log(this.data);
  //   this.http.get('localhost/get').subscribe(data => {
  //     console.log(data);
  //   })
  // }

  ngOnInit() {
    // this.getData();
    this.Showdatatable();
    this.showstatus();
    this.getNumYear()
  }
  num_year: any;
  getNumYear() {
    this.dateService.getNumYear().then(numyear => {
      console.log("num year ", numyear);
      this.num_year = numyear;
    })
  }

  getDocfromYear(year) {
    this.documentService.getDocfromYear(year).then(data => {
      console.log("doc from year ", data);
      this.show = data;
    })
  }

  goToHome(data) {
    let navigationExtras: NavigationExtras = {
      queryParams: {
        created_at: data.created_at,
        date_created_at: data.created_at,
        day: data.day,
        day_time: data.day_time,
        date_deleted_at: data.deleted_at,
        hour: data.hour,
        date_id: data.id,
        minute: data.minute,
        month: data.month,
        mounth_time: data.mounth_time,
        second: data.second,
        date_updated_at: data.updated_at,
        year: data.year,
        year_time: data.year_time,
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
        check: 2
      },
      skipLocationChange : true
    };    
    this.router.navigate(["home"], navigationExtras);
  }
  goToHomeDupNumBook(num_book, data) {
    console.log("goToHomeDupNumBook ", num_book);
    console.log("dataaaaaaaaa333 ", data);
    var num = num_book.toLocaleString();
    num = num.split(".");
    num = Number(num[0]);
    
    let navigationExtras: NavigationExtras = {
      queryParams: {
        numbook: num,
        day_time: data.day_time,
        month: data.month,
        year: data.year,
      },
      skipLocationChange : true
    };    
    this.router.navigate(["home"], navigationExtras);
  }

}
