import { Observable } from 'rxjs/Rx';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { AppSettings } from './../../../app-settings';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
@Component({
  selector: 'app-cashaa-google-suggestion',
  templateUrl: 'cashaa-google-suggestion.component.html',
  styleUrls: ['cashaa-google-suggestion.component.css']
})
export class CashaaGoogleSuggestionComponent implements OnInit {
@Output() notifyGogglesuggestionSelectedtoparents: EventEmitter<any> = new EventEmitter<any>();
  constructor(private _http:Http) { }
  @Input() cityid: number;
  ngOnInit() {
  }
  googleSuggestionselected(smp){
  this.notifyGogglesuggestionSelectedtoparents.emit(smp);
  //hook parentcomponenthere
}
Formatecitysuggestion= (data: any) => {
     let html = `<li class="collection-item dismissable"><div>${data}<a href="#!" class="secondary-content"><i class="material-icons">send</i></a></div></li> `;
     return html;
  }
  googlesuggestionsource = (keyword: any): Observable<any[]> => {
       let CityKey:number=this.cityid;
       let url: string = `${AppSettings.API_ENDPOINT}/google/places?query=${keyword}&CityKey=${CityKey}`
       if (keyword) {
      return this._http.get(url,{ body: "" })
        .map(res => {
          let json = res.json();
          return json;
        })
    } else {
      return Observable.of([]);
    }
  }
}
