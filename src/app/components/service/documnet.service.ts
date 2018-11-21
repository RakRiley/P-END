import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers  } from '@angular/http';

import 'rxjs/add/operator/map';
import { UrlResolver } from '@angular/compiler';
import { environment } from '../../../environments/environment';
 var swal = require('sweetalert');
// import swal from 'sweetalert';
@Injectable()
export class DocumnetService {

  constructor(private http: Http) { }


  getDocument() {
    return new Promise((resolve,reject)=>{
      this.http.get(environment.api+'/getDocument').map(res=>res.json())
      .subscribe((data)=>{
        resolve(data)
      },error=>{
        reject(error);
      })
    })
  }
  
  getDocumentC() {
    return new Promise((resolve,reject)=>{
      this.http.get(environment.api+'/getDocumentC').map(res=>res.json())
      .subscribe((data)=>{
        resolve(data)
      },error=>{
        reject(error);
      })
    })
  }

  getDocumentDistinct() {
    return new Promise((resolve,reject)=>{
      this.http.get(environment.api+'/getDocumentDistinct').map(res=>res.json())
      .subscribe((data)=>{
        resolve(data)
      },error=>{
        reject(error);
      })
    })
  }
  getDocumentNumBook(num) {
    return new Promise((resolve,reject)=>{
      this.http.get(environment.api+'/getNumBook?numbook='+num).map(res=>res.json())
      .subscribe((data)=>{
        resolve(data)
      },error=>{
        reject(error);
      })
    })
  }
  getDocfromYear(year) {
    return new Promise((resolve,reject)=>{
      this.http.get(environment.api+'/getDocfromYear?year='+year).map(res=>res.json())
      .subscribe((data)=>{
        resolve(data)
      },error=>{
        reject(error);
      })
    })
  }

  getDocfrommonth(mounth) {
    return new Promise((resolve,reject)=>{
      this.http.get(environment.api+'/getDocfrommonth?mounth='+mounth).map(res=>res.json())
      .subscribe((data)=>{
        resolve(data)
      },error=>{
        reject(error);
      })
    })
  }
  
  getDatepicker(num) {
    return new Promise((resolve,reject)=>{
      this.http.get(environment.api+'/getDatepicker?numbook='+num).map(res=>res.json())
      .subscribe((data)=>{
        resolve(data)
      },error=>{
        reject(error);
      })
    })
  }

  getDocumentnumN(){
    return new Promise((resolve,reject)=>{
      this.http.get(environment.api+'/getDocumentnumN').map(res=>res.json())
      .subscribe((data)=>{
        resolve(data)
      },error=>{
        reject(error);
      })
    })
  }

  getNumber_of_book_repeatedly(NR){
    return new Promise((resolve,reject)=>{
      this.http.get(environment.api+'/getNumber_of_book_repeatedly?repeatedly='+NR).map(res=>res.json())
      .subscribe((data)=>{
        resolve(data)
      },error=>{
        reject(error);
      })
    })
  }

  getStatusC() {
    return new Promise((resolve,reject)=>{
      this.http.get(environment.api+'/getStatusC').map(res=>res.json())
      .subscribe((data)=>{
        resolve(data)
      },error=>{
        reject(error);
      })
    })
  }

  getStatusU() {
    return new Promise((resolve,reject)=>{
      this.http.get(environment.api+'/getStatusU').map(res=>res.json())
      .subscribe((data)=>{
        resolve(data)
      },error=>{
        reject(error);
      })
    })
  }


  postDocument(data){
    return new Promise((resolve,reject)=>{
      let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
      let options = new RequestOptions({ headers: cpHeaders });
      console.log('success post doucument');
      this.http.post(environment.api+"/postDocument", JSON.stringify(data), options)
          .map(res => res.json())
          .subscribe((data)=>{
            resolve(data)
             swal("สำเร็จ!", "ดีใจด้วย", "success");
          },error=>{
            reject(error);
             swal("ไม่ได้!", "ทำใหม่นะ", "warning");
            //  alert('dd');
          });
    }); 

        
} 


putStatusDocument(data,id){
  return new Promise((resolve,reject)=>{
    let header = new Headers({ "Content-Type": "application/json" });
    let options = new RequestOptions({ headers: header });
    this.http.put( environment.api+"/putStatusDocument/"+id, data, options)
      .map(res => res)
      .subscribe((data)=>{
        resolve(data)
      },error=>{
        reject(error);
      });
  });
}


putDocument(data,id){
  return new Promise((resolve,reject)=>{
    let header = new Headers({ "Content-Type": "application/json" });
    let options = new RequestOptions({ headers: header });
    this.http.put( environment.api+"/putDocument/"+id, data, options)
      .map(res => res)
      .subscribe((data)=>{
        resolve(data)
      },error=>{
        reject(error);
      });
  });
}

}
