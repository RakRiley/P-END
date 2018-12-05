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
var swal = require('sweetalert');
import Swal from 'sweetalert2'
import { YearPegService } from '../service/year-peg.service';
import {  } from '@angular/core'
import { NgxDrpOptions, PresetItem, Range } from 'ngx-mat-daterange-picker';
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
  selectype:any;
  urlapi = environment.api
  constructor(private http: Http, 
  public router:Router, 
  private documentService : DocumnetService, 
  private dateService : DateService,
  private fileService : FileService,
  private year_pegService :YearPegService,) { 
  
    const today = new Date();
    const fromMin = new Date(today.getFullYear()+543, today.getMonth()-2, 1);
    const fromMax = new Date(today.getFullYear()+543, today.getMonth()+1, 0);
    const toMin = new Date(today.getFullYear()+543, today.getMonth()-1, 1);
    const toMax = new Date(today.getFullYear()+543, today.getMonth()+2, 0);
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
  A:any

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
      Swal({
        title: 'คุณแน่ใจหรือไม่?',
        text: 'คุณจะไม่สามารถใช้ไฟล์เอกสารนี้ได้.',
        type: 'warning',
        showCancelButton: true,
        confirmButtonText: 'ใช่, ยกเลิก ไฟล์เอกสาร!',
        cancelButtonText: 'ไม่, ไม่ยกเลิก ไฟล์เอกสาร'
      }).then((result) => {
        if (result.value) {
          Swal(
            
            'ยกเลิกเรียบร้อยแล้ว!',
            'ไฟล์เอกสารของคุณได้ถูกยกเลิกแล้ว.',
            'success'
          );     this.documentService.putStatusDocument(status,id).then(res => {
            // if(res) {
            //   console.log("Add status success");  
            // }
            
            this.Showdatatable();
          })
        // For more information about handling dismissals please visit
        // https://sweetalert2.github.io/#handling-dismissals
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          Swal(
            'หยุด',
            'ไฟล์เอกสาร ของคุณปลอยภัยแล้ว 🙂',
            'error'
          )
        }
      })     
  
  }

  

//   putstatusU(id){
//     console.log("id xxxx", id);
    
//     var status = {status: "U"};
//     this.documentService.putStatusDocument(status,id).then(res => {
//       if(res) {
//         console.log("Add status success");  
//       }
//       this.Showdatatable();
//     })

// }


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
            swal("อัพโหลดเรียบร้อย!", "เสร็จสิ้น", "success");
          }
          this.Showdatatable();
        })
      }
      reader.readAsDataURL(event.target.files[0]);
  // }
      }
  }

  
  D;
  DD;
  i;
  getYear_peg(){
    this.year_pegService.getYear_peg().then((yp:any)=>{
        this.numpeg = yp;
        this.numpeg.forEach(e => {
          if (new Date().getFullYear()+543 == e.year_change) {
            this.nuu = e.peg_change;
            return false;
          }
        });
     
    })
  }
    
  len:any=null;
  postDocumentsearchdate(){
    this.documentService.postDocumentsearch(null,null,this.len).then((docc:any)=>{
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
      this.year_pegService.getYear_peg().then((yp:any)=>{
        this.numpeg = yp;
        this.numpeg.forEach(e => {
          if (new Date().getFullYear()+543 == e.year_change) {
            this.nuu = e.peg_change;
            return false;
          }
        });
        this.show.forEach(e => {
          if (Number(e.number_of_book) === e.number_of_book && e.number_of_book % 1 === 0) {
            e.number_of_book = ('0000000'+e.number_of_book).slice(-this.nuu)
          }
          else {
            e.number_of_book = ('0000000'+e.number_of_book).slice(-this.nuu-2)
          }
        });
        console.log("showssssssww",this.show);  
        
      });
      
    });
  }

  text:any="";
  type:any="";
  postDocumentsearch(){
    this.documentService.postDocumentsearch(this.type,this.text,null).then((docc:any)=>{
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
      this.year_pegService.getYear_peg().then((yp:any)=>{
        this.numpeg = yp;
        this.numpeg.forEach(e => {
          if (new Date().getFullYear()+543 == e.year_change) {
            this.nuu = e.peg_change;
            return false;
          }
        });
        this.show.forEach(e => {
          if (Number(e.number_of_book) === e.number_of_book && e.number_of_book % 1 === 0) {
            e.number_of_book = ('0000000'+e.number_of_book).slice(-this.nuu)
          }
          else {
            e.number_of_book = ('0000000'+e.number_of_book).slice(-this.nuu-2)
          }
        });
        console.log("showssssssww",this.show);  
        
      });
      
    });
    
  }


  numpeg;
  nuu
    show : any;
  Showdatatable(){
    this.documentService.postDocumentsearch(this.type,this.text,this.len).then((docc:any)=>{
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
      this.year_pegService.getYear_peg().then((yp:any)=>{
        this.numpeg = yp;
        this.numpeg.forEach(e => {
          if (new Date().getFullYear()+543 == e.year_change) {
            this.nuu = e.peg_change;
            return false;
          }
        });
        this.show.forEach(e => {
          if (Number(e.number_of_book) === e.number_of_book && e.number_of_book % 1 === 0) {
            e.number_of_book = ('0000000'+e.number_of_book).slice(-this.nuu)
          }
          else {
            e.number_of_book = ('0000000'+e.number_of_book).slice(-this.nuu-2)
          }
        });
        console.log("showssssssww",this.show);  
        
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
      this.show.forEach(e => {
        if (Number(e.number_of_book) === e.number_of_book && e.number_of_book % 1 === 0) {
          e.number_of_book = ('0000000'+e.number_of_book).slice(-this.nuu)
        }
        else {
          e.number_of_book = ('0000000'+e.number_of_book).slice(-this.nuu-2)
        }
      });
      console.log("showscccccc",this.show); 
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
    this.getNumYear();
    this.getNumMounth();
    this.getYear_peg();
    this.setupPresets();
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
      this.show.forEach(e => {
        if (Number(e.number_of_book) === e.number_of_book && e.number_of_book % 1 === 0) {
          e.number_of_book = ('0000000'+e.number_of_book).slice(-this.nuu)
        }
        else {
          e.number_of_book = ('0000000'+e.number_of_book).slice(-this.nuu-2)
        }
      });
      console.log("showsyyyyyyyy",this.show); 
    })
  }

  num_mounth: any;
  getNumMounth() {
    this.dateService.getNumMounth().then(nummounth => {
      console.log("num mounth ", nummounth);
      this.num_mounth = nummounth;
    })
  }

  getDocfrommonth(mounth) {
    this.documentService.getDocfrommonth(mounth).then(data => {
      console.log("doc from mounth ", data);
      this.show = data;
      this.show.forEach(e => {
        if (Number(e.number_of_book) === e.number_of_book && e.number_of_book % 1 === 0) {
          e.number_of_book = ('0000000'+e.number_of_book).slice(-this.nuu)
        }
        else {
          e.number_of_book = ('0000000'+e.number_of_book).slice(-this.nuu-2)
        }
      });
      console.log("showsmmmmmm",this.show); 
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


  goToHomeNumC(num_book,data) {
    console.log("goToHomeNumC ", num_book,data);
    var day1,day2,month1,month2,year1,year2;
    this.documentService.getDatepicker(num_book).then(date => {
      if (Number(num_book) === num_book && num_book % 1 !== 0) {
          day1 = date[0].day_time
          day2 = date[0].day_time
          month1 = date[0].mounth_time
          month2 = date[0].mounth_time
          year1 = date[0].year_time
          year2 = date[0].year_time
      } else {
          day1 = date[0].day_time
          day2 = date[1].day_time
          month1 = date[0].mounth_time
          month2 = date[1].mounth_time
          year1 = date[0].year_time
          year2 = date[1].year_time
      }
      let navigationExtras: NavigationExtras = {
        queryParams: {
          id:data.id,
          numbook: num_book,
          day1: day1,
          day2: day2,
          month1: month1,
          month2: month2,
          year1: year1,
          year2: year2,
          check: 4
        },
        skipLocationChange : true
      };    
      this.router.navigate(["home"], navigationExtras);
    })
    
  }

}
