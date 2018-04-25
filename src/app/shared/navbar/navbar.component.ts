import { Component, OnInit } from '@angular/core';
import {  Router } from '@angular/router';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(public router:Router) { }

  
  goTo(input){
    this.router.navigate(['home'])
    if(input==1){
      window.scroll(0,150)
    }else if(input==2){
      window.scroll(0,1400)
    }else{
      window.scroll(0,0)
    }
    
  }

  ngOnInit() {
  }

}
