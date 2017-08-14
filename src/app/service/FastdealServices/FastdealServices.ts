import { AppSettings } from './../../app-settings';
import { TransactionRequestModel } from './../../models/TransactionRequestModel';
import { Router } from '@angular/router';
import { LocalStorageSubscriber } from 'angular2-localstorage/LocalStorageEmitter';
import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Observable';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
@Injectable()
export class FastdealServices {
     citielist: any[] = [];
     showLoader = false;
      public _IsAuthenticated:BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    constructor(private http: Http,private _router: Router) {
    }
    // private instance variable to hold base url
    private citiesUrl = 'http://localhost:10577/api/cities';
    PostFastDeal(transactionRequestModel: TransactionRequestModel): Observable<any> {
    {
      let bodyString = JSON.stringify(transactionRequestModel); 
      console.log(bodyString);
let token:string= localStorage.getItem("_cashaacryptoAcessToken");
let headers = new Headers({'Content-Type': 'application/json'});  
 headers.append('Authorization',`Basic ${token}`)
 let options:RequestOptions= new RequestOptions({headers: headers});
var body = JSON.stringify(transactionRequestModel);
return this.http.post(`${AppSettings.API_ENDPOINT}UserDeal`, body,options) ;
     // .map((res: Response) => res.json()) 
     // .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }
  }
}
