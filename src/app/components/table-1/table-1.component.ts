import { Component, OnInit } from '@angular/core';
// import { GetApiService } from '../../get-api.service';
import { Http }       from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-table-1',
  templateUrl: './table-1.component.html',
  styleUrls: ['./table-1.component.css']
})
export class Table1Component implements OnInit {

  data:any;

  constructor(private http: Http) { }

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
  }

}
