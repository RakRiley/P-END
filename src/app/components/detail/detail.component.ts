import { Component, OnInit, Input } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { UserService } from '../service/user.service';
import { DocumnetService } from '../service/documnet.service';
import { DateService } from '../service/date.service';
@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {
  closeResult: string;
  @Input() dataDoc: any;

  constructor(private modalService: NgbModal,private userService : UserService, private documentService :DocumnetService , private dateService : DateService) { }

  // openBackDropCustomClass(content) {
  //   this.modalService.open(content, {backdropClass: 'light-blue-backdrop'});
  // }

  // openWindowCustomClass(content) {
  //   this.modalService.open(content, { windowClass: 'dark-modal' });
  // }

  // openSm(content) {
  //   this.modalService.open(content, { size: 'sm' });
  // }

  // openLg(content) {
  //  this.modalService.open(content, { size: 'lg' });
  // }
detall :any;
  show3tabal(){
this.documentService.getDocument().then((note:any)=>{
console.log(note);
this.detall=note;
});
  }

  openVerticallyCentered(content) {
    this.modalService.open(content, { size: 'lg' , centered: true , backdropClass: 'light-blue-backdrop' });
  }

  ngOnInit() {
    console.log("data from doc",this.dataDoc);
  }

}
