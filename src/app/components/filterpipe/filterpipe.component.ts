import { Component, OnInit } from '@angular/core';
import { DocumnetService } from '../service/documnet.service';
@Component({
  selector: 'app-filterpipe',
  templateUrl: './filterpipe.component.html',
  styleUrls: ['./filterpipe.component.css']
})
export class FilterpipeComponent implements OnInit {

  constructor(public documentService:DocumnetService) { }

//   transform(items: any[], searchText: string): any[] {
//     if(!items) return [];
//     if(!searchText) return items;
// searchText = searchText.toLowerCase();
// return items.filter( it => {
//       return it.toLowerCase().includes(searchText);
//     });
//    }

   transform(items: any[], searchText: string): any[] {
    if(!items) return [];
    if(!searchText) return items;
searchText = searchText.toLowerCase();
return items.filter( it => {
      return it.toLowerCase().includes(searchText);
    });
   }

  //  Stxet(){
  //    this.documentService.getDocument().then((i:any[])=>{

  //    })
  //  }
   
  ngOnInit() {
  }

}
