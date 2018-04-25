import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { throttle} from 'lodash'
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  tab:number;
  constructor(public param:ActivatedRoute,public router:Router) {
    this.tab=1 
    
  }


  tabchange(number){
    this.tab=number;
  }
  collapse(kkk){

  }
  ngOnInit() {
    
  }

}
