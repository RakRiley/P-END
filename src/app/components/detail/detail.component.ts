import { Component, OnInit } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {
  closeResult: string;

  constructor(private modalService: NgbModal) { }

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

  openVerticallyCentered(content) {
    this.modalService.open(content, { size: 'lg' , centered: true , backdropClass: 'light-blue-backdrop' });
  }

  ngOnInit() {
  }

}
