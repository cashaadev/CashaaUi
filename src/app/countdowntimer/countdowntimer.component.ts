import { Countdownmodel } from './../models/countdownmodel';
import { SharedService } from './../service/shared.service';

import { Component, OnInit, ElementRef } from '@angular/core';
import { Observable } from 'rxjs/Rx';

@Component({
  selector: 'app-countdowntimer',
  templateUrl: 'countdowntimer.component.html',
  styleUrls: ['countdowntimer.component.css']
})
export class CountdowntimerComponent implements OnInit {

  private futureString: string;
  private diff: number;
  private message: string;

    _hours: number=0;
    _minutes: number=0;
    _seconds: number=0;

    constructor(elm: ElementRef, private _sharedservice: SharedService) {
    this.futureString = elm.nativeElement.getAttribute('enddate');
 

  }


  dhms(t) {


    if (t < 0) {
      t = 0;
    }
    var days, hours, minutes, seconds;
    days = Math.floor(t / 86400);

    t -= days * 86400;

    hours = Math.floor(t / 3600) % 24;
    t -= hours * 3600;

    if (days > 0) {
      hours = hours + days * 24;
    }

    minutes = Math.floor(t / 60) % 60;
    t -= minutes * 60;
    seconds = t % 60;

this._hours=hours;
this._minutes=minutes;
this._seconds=seconds;


    return [
       days + 'd',
      hours + 'h',
      minutes + 'm',
      seconds + 's'
   ].join(' ');
  }
  ngOnInit() {
    Observable.interval(1000).map((x) => {
      this.diff = Math.floor((this._sharedservice.convertLocalDateToUTCDate(new Date(this.futureString), false).getTime() - new Date().getTime()) / 1000);
    }).subscribe((x) => {
  
   this.message =this.dhms(this.diff);
    });
  }
}