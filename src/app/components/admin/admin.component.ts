import { Component, OnInit } from '@angular/core';
import { UserService } from '../service/user.service';
import { Http } from '@angular/http';
import {SignerService} from '../service/signer.service'
import { YearPegService } from '../service/year-peg.service';
import { DateService } from '../service/date.service';
var swal = require('sweetalert');
import { IMyDpOptions } from 'mydatepicker-thai';
import { ChartsModule } from 'ng2-charts';
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

link:number;
userData:any;
name:any = {name: ""};
Aname:any ="";
num_peg : any;
peg_change :any;
year_change :any="เลือกปี";
year_id :any;
data_graph: any[] = [];
year_graph: any[] = [];
  constructor(private userService : UserService,
              private signerService : SignerService,
              private year_pegService :YearPegService,
              private dateService :DateService,) { 
            
  this.link=1
  }  
  
  getallYear() {
    this.data_graph = [];
    this.year_graph = [];
    this.dateService.getallYear().then((res: any) => {
      console.log("res get all year : ", res);
      res.forEach(e => {
        this.data_graph.push(e.total);
        this.year_graph.push(e.year);
      });
      // this.data_graph.push(0);
      // this.year_graph.push("test");
      console.log("this.year_graph",this.data_graph);
      console.log("this.year_graph",this.year_graph);

      this.barChartOptions = {
        scaleShowVerticalLines: false,
        responsive: true,
        scales: {
          yAxes: [{
              ticks: {
                  beginAtZero: true
              }
          }]
        }
      };
      this.barChartLabels = this.year_graph;
      this.barChartType = 'bar';
      this.barChartLegend = true;
      this.barChartData = [
        {
          data: this.data_graph, 
          label: '1',
        },
        // {data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B'}
      ];
    })
  }

  public barChartOptions:any = {
    scaleShowVerticalLines: false,
    responsive: true,
    scales: {
      yAxes: [{
          ticks: {
              beginAtZero: true
          }
      }]
    }
  };
  public barChartLabels:string[] = this.year_graph;
  public barChartType:string = 'bar';
  public barChartLegend:boolean = true;
 
  public barChartData:any[] = [
    {data: this.data_graph, label: 'Series A'},
    // {data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B'}
  ];
 
  // events
  public chartClicked(e:any):void {
    console.log(e);
  }
 
  public chartHovered(e:any):void {
    console.log(e);
  }
 
  // public randomize():void {
  //   // Only Change 3 values
  //   let data = [
  //     Math.round(Math.random() * 100),
  //     59,
  //     80,
  //     (Math.random() * 100),
  //     56,
  //     (Math.random() * 100),
  //     40];
  //   let clone = JSON.parse(JSON.stringify(this.barChartData));
  //   clone[0].data = data;
  //   this.barChartData = clone;
  // }








  getUser(){
    this.userService.getUser().then((data:any)=>{
      if(data.status=='error'){
        console.log('ddd');
      }else{
        this.userData = data;
         console.log(this.userData);
      }
    });
  }


  si:any;
  getsigner(){
    this.signerService.getSigner().then((sig:any)=>{
      console.log(sig,'ดูชื่อ')
      this.si = sig
    });
  }


  putSigner() {
    var datat = {
      name : this.name.name
      
  };
    this.signerService.putSigner(datat,this.name.id).then((res)=>{
      if(res){
        swal("อัพเดทเรียบร้อย!", "เสร็จสิ้น", "success");
        this.name="";
      }
    })
    
           
  }

  postSigner(){
    var data ={
      name : this.Aname
    }
    this.signerService.postSigner(data).then((res)=>{
      if(res){
        swal("เพิ่มชื่อเรียบร้อย!", "เสร็จสิ้น", "success");
        this.Aname="";
      }
    })
  }

linkchange(number){
  this.link=number;
}

Year_peg :any;
getYear_peg(){
  this.year_pegService.getYear_peg().then((data:any)=>{
    this.Year_peg = data;
    console.log('year_change',this.Year_peg);
  })
}


putYear_peg() {
  console.log("year_change", this.year_change);
  console.log("peg_change", this.peg_change);
  var datat = {
    peg_change : this.peg_change
};
  if(this.peg_change !='' ){
    this.year_pegService.putYear_peg(datat,this.year_change).then((res)=>{
      if(res){
        swal("เปลี่ยนหลักเรียบร้อย!", "เสร็จสิ้น", "success");
        this.peg_change="";
        this.year_change="เลือกปี";
      }
    })
  }
  else{
    swal("ไม่ได้!", "ทำใหม่นะ", "warning");
    this.year_change="เลือกปี";
  }
  
}

// postYear_peg(){
//   var data ={
//     year_chang : this.year_chang
//   }
//   this.signerService.postSigner(data).then((res)=>{
//     if(res){
     
//     }
//     else{

//     }
//   })
// }
  



  ngOnInit() {
    this.getUser();
    this.getsigner();
    this.getYear_peg();
    this.getallYear()  
  }

}
