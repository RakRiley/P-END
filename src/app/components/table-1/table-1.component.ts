import { Component, OnInit } from '@angular/core';
// import { GetApiService } from '../../get-api.service';
import { Http }       from '@angular/http';

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
  admin = false;
  numpage: number = 0;
  data:any;
  urlapi = environment.api
  constructor(private http: Http, 
  private documentService : DocumnetService, 
  private dateService : DateService) { 
    this.admin = false;
  }
  
  numPage(event){
    
    this.numpage = (event-1)*10;
    
   }

   openfile(filepath){
    window.open(this.urlapi+'/'+filepath);
  }

    show : any;
  Showdatatable(){
    this.documentService.getDocument().then((docc:any)=>{
      console.log(docc,'ข้อมูลของตารางdoc')
      this.show=docc;
    });
    
    this.dateService.getDate().then((dataa:any)=>{
      dataa.forEach(t => {
        this.show.forEach(l => {
          if(t.id == l.date_id){
            l.date_id = t;
        //      if (l.date_id.month == 1) {
        //   l.date_id.month = 'มกราคม';
        // }
        // else if (l.date_id.month == 2) {
        //   l.date_id.month = 'กุมภาพันธ์';
        // }
        // else if (l.date_id.month == 3) {
        //   l.date_id.month = 'มีนาคม';
        // } 
        // else if (l.date_id.month == 4) {
        //   l.date_id.month = 'เมษายน';
        // } 
        // else if (l.date_id.month == 5) {
        //   l.date_id.month = 'พฤษภาคม';
        // } 
        // else if (l.date_id.month == 6) {
        //   l.date_id.month = 'มิถุนายน';
        // } 
        // else if (l.date_id.month == 7) {
        //   l.date_id.month = 'กรกฎาคม';
        // } 
        // else if (l.date_id.month == 8) {
        //   l.date_id.month = 'สิงหาคม';
        // } 
        // else if (l.date_id.month == 9) {
        //   l.date_id.month = 'กันยายน';
        // } 
        // else if (l.date_id.month == 10) {
        //   l.date_id.month = 'ตุลาคม';
        // } 
        // else if (l.date_id.month == 11) {
        //   l.date_id.month = 'พฤศจิกายน';
        // } 
        // else if (l.date_id.month == 12) {
        //   l.date_id.month = 'ธันวาคม';
        // }
          }
        });
      });
      console.log(dataa,'ข้อมูลของตารางdate')
    });
  }

  getData() {
 
    // this.data = this.http.get('localhost:8000/get')
    //     .map(response => response.json());
    // console.log(this.data);
    this.http.get('localhost/get').subscribe(data => {
      console.log(data);
    })
  }

  ngOnInit() {
    this.getData();
    this.Showdatatable();
  }

}
