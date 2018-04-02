import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  tab:number;
  constructor() {
    this.tab=1 
  }


  tabchange(number){
    this.tab=number;
  }
  ngOnInit() {
    
  }

}
