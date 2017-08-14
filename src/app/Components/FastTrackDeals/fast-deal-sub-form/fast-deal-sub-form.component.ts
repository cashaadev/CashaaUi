import { Observable } from 'rxjs/Rx';
import { AppSettings } from './../../../app-settings';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { FormGroup } from '@angular/forms';
import { Component, OnInit, Input } from '@angular/core';
@Component({
    selector: 'app-fast-deal-sub-form',
  templateUrl: 'fast-deal-sub-form.component.html',
  styleUrls: ['fast-deal-sub-form.component.css']
})
export class FastDealSubFormComponent implements OnInit {
 @Input('group')
    public fastsellsubform: FormGroup;
     cityId:any;
  constructor(private _http:Http) { }
  ngOnInit() {
  }
smpselectedmodel:any;
tradecitySource = (keyword: any): Observable<any[]> => {
this.fastsellsubform.markAsTouched();
    let url: string = `${AppSettings.API_ENDPOINT}Cities`
      let token:string= localStorage.getItem("_cashaacryptoAcessToken");
       let headers = new Headers({ 'Authorization': `Basic ${token}` });
        let options = new RequestOptions({ headers: headers });
    if (keyword) {
      return this._http.get(url,options)
        .map(res => {
          let json = res.json();
          return json;
        })
    } else {
      return Observable.of([]);
    }
  }
SmpSelected(smp){
}
listensmpgooglesuggeationselectedfromchildcomponet(smp){
this.fastsellsubform.controls['SMP'].setValue(smp);
}
listencityselectedfromchildcomponet(cityobj)
{
this.cityId=cityobj.Key;
  this.fastsellsubform.controls['SMP'].setValue(null);
  this.fastsellsubform.controls['StartCityID'].setValue(cityobj.Key);
}
googlesuggestionsource = (keyword: any): Observable<any[]> => {
     let CityKey:number= this.fastsellsubform.controls['StartCityID'].value;
     let token:string= localStorage.getItem("_cashaacryptoAcessToken");
      let url: string = `${AppSettings.API_ENDPOINT}/google/places?query=${keyword}&CityKey=${CityKey}`
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
