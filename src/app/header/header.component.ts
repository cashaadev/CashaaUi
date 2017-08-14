import { SharedService } from './../service/shared.service';
import { Component, OnInit,Optional  } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent 
 {

_IsAuthenticated:boolean=true;
constructor(private _sharedservice:SharedService){

  this._sharedservice._IsAuthenticated.subscribe(value => this._IsAuthenticated = value);
}
  
}