import { Component, OnInit } from '@angular/core';
// import { GetApiService } from '../../get-api.service';
import { Http }       from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { DocumnetService } from '../service/documnet.service';
import { DateService } from '../service/date.service';

@Component({
  selector: 'app-table-1',
  templateUrl: './table-1.component.html',
  styleUrls: ['./table-1.component.css']
})
export class Table1Component implements OnInit {
  numpage: number = 0;
  data:any;

  constructor(private http: Http, 
  private documentService : DocumnetService, 
  private dateService : DateService) { }
  
  numPage(event){
    
    this.numpage = (event-1)*10;
    
    
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
