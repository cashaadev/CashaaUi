import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-pre-loader',
  templateUrl: 'pre-loader.component.html',
  styleUrls: ['pre-loader.component.css']
})
export class PreLoaderComponent implements OnInit {
 //@Input()loading: Boolean;  
  constructor() {
  //  this.loading=false;
   }

  ngOnInit() {

    // console.debug('init: loader state: ', 
    //                    this.loading, 
    //                    typeof(this.loading)); // => init: loader state:  false string
  }

}
