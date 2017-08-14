import { SharedService } from './../service/shared.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-leftsidebar',
  templateUrl: './leftsidebar.component.html',
  styleUrls: ['./leftsidebar.component.css']
})
export class LeftsidebarComponent implements OnInit {

_IsAuthenticated:boolean=false;
  constructor(private _sharedservice:SharedService) { 

this._sharedservice._IsAuthenticated.subscribe(value => this._IsAuthenticated = value);

  }

  ngOnInit() {
  }

}
