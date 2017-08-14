import { Router } from '@angular/router';
import { LocalStorageSubscriber } from 'angular2-localstorage/LocalStorageEmitter';
import { LoginModel } from './../models/login';
import { AppSettings } from './../app-settings';
import { PubSubService } from './pub-sub.service';
import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Cities } from './../models/cities';
import { Observable } from 'rxjs/Observable';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
@Injectable()
export class SharedService {
     citielist: any[] = [];
     showLoader = false;
      public _IsAuthenticated:BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    constructor(private http: Http,private _pubsub:PubSubService,private _router: Router) {
     this._pubsub.beforeRequest.subscribe(data => this.showLoader = true);
     this._pubsub.afterRequest.subscribe(data => this.showLoader = false);
    }
    // private instance variable to hold base url
    private citiesUrl = 'http://localhost:10577/api/cities';
    getCityList(): Observable<any[]> {
        return this.http.get(this.citiesUrl)
            // ...and calling .json() on the response to return data
            .map((res: Response) => res.json())
            //...errors if any
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }
//Covert datetime by GMT offset 
//If toUTC is true then return UTC time other wise return local time
     convertLocalDateToUTCDate(date, toUTC) {
    date = new Date(date);
    //Local time converted to UTC
    //console.log("Time: " + date);
    var localOffset = date.getTimezoneOffset() * 60000;
    var localTime = date.getTime();
    if (toUTC) {
        date = localTime + localOffset;
    } else {
        date = localTime - localOffset;
    }
    date = new Date(date);
   // console.log("Converted time: " + date);
    return date;
}
 convertUTCDateToLocalDate(date) {
        var convertdLocalTime = new Date(date);
        var hourOffset = convertdLocalTime.getTimezoneOffset() / 60;
        convertdLocalTime.setHours( convertdLocalTime.getHours() + hourOffset ); 
        return convertdLocalTime;
}
    IsAuthenticated() {
        if (localStorage.getItem(AppSettings.localtokenkey)!=null) {
        this._IsAuthenticated.next(true);
        }
    else{
          this._IsAuthenticated.next(false);
    }
    }
 logout() {
localStorage.removeItem(AppSettings.localtokenkey);
      // localStorage.setItem(AppSettings.localtokenkey,null);
     this.IsAuthenticated();
     this._router.navigate(['SignIn']);
    }
 Login(login:LoginModel): Observable<Response> {
        return this.http.post(`${AppSettings.API_ENDPOINT}token`,login);
            // ...and calling .json() on the response to return data
            //...errors if any
    }
}
