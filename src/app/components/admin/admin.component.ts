import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

link:number;
  constructor() { 
    this.link=1 
  }

hhhh

linkchange(number){
  this.link=number;
}
  ngOnInit() {
  }

}
