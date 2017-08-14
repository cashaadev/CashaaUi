import { Observable } from 'rxjs/Rx';
import { SharedService } from './service/shared.service';
import { Component } from '@angular/core';
import { LoaderService } from "./service/loader-service.service";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

 objLoaderStatus: boolean;
  constructor(private _sharedservice: SharedService, private loaderService: LoaderService) { 
  this.objLoaderStatus=false; 
    
  }
  title = 'app works!';

 ngOnInit() {

this.loaderService.loaderStatus.subscribe((val: boolean) => {
            this.objLoaderStatus = val;
        });

      // this.loading=true; 

// let timer = Observable.timer(5000,5000);
//     timer.subscribe(t=> {
//       console.log(this.loading);
//       if( this.loading){
//  this.loading=false; 
//       }
//       else{
//         this.loading=true; 
//       }
     

//        // this.func(t);
//     });

    }


    ngAfterViewChecked() {
    // Component views have been checked
  }
}
