import { AppSettings } from './../../../app-settings';
import { Observable } from 'rxjs/Rx';
import { FormGroup } from '@angular/forms';
import { Component, OnInit, Input } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
@Component({
  selector: 'app-banks-form',
  templateUrl: 'banks-form.component.html',
  styleUrls: ['banks-form.component.css']
})
export class BanksFormComponent implements OnInit {
  @Input('group')
 public bankform: FormGroup;
  constructor(private _http:Http) { }
  ngOnInit() {
  }
 Getuserbanklist = (keyword: any): Observable<any[]> => {
     let token:string= localStorage.getItem("_cashaacryptoAcessToken");
     let url: string = `${AppSettings.API_ENDPOINT}/receivers/?Page=5&Take=10`;
     let headers = new Headers({ 'Authorization': `Basic ${token}` });
     let options = new RequestOptions({ headers: headers });
      if (keyword) {
      return this._http.get(url)
        .map(res => {
          let json = res.json();
          return json;
        })
    } else {
      return Observable.of([]);
    }
  }
}