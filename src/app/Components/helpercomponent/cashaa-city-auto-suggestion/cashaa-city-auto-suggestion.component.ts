import { LoaderService } from './../../../service/loader-service.service';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { AppSettings } from './../../../app-settings';
import { Observable } from 'rxjs/Rx';
import { Component, OnInit, EventEmitter, Output } from '@angular/core';
//import { DomSanitizationService, SecurityContext, SafeHtml } from '@angular/platform-browser';
@Component({

  selector: 'app-cashaa-city-auto-suggestion',
  templateUrl: 'cashaa-city-auto-suggestion.component.html',
  styleUrls: ['cashaa-city-auto-suggestion.component.css']
})
export class CashaaCityAutoSuggestionComponent implements OnInit {

     @Output() notifcitySelectedfromchildtoparent: EventEmitter<any> = new EventEmitter<any>();

// private _sanitizer: DomSanitizer
citylist:any;
constructor(private _http:Http, private loaderService: LoaderService) {
    
 }

  ngOnInit() {
  }

citySelected(value){
  this.notifcitySelectedfromchildtoparent.emit(value);
}


Formatecitysuggestion= (data: any) => {

     let html = `<li class="collection-item dismissable"><div>${data.FullName}<a href="#!" class="secondary-content"><i class="material-icons">send</i></a></div></li> `;

     return html;
   //  ${data.id}  return this._sanitizer.bypassSecurityTrustHtml(html);
  }
tradecitySource = (keyword: any): Observable<any[]> => {
 this.loaderService.displayLoader(true);
  let url: string = `${AppSettings.API_ENDPOINT}Cities`
 let citylist  :any[]=null;
    if (keyword) {


 this._http.get(url,{ body: "" })
    .map(res =>  res.json())
    .subscribe(
      data => this.citylist=data,
      err => this.loaderService.displayLoader(false),
      () => this.loaderService.displayLoader(false)
    );

      
      return this._http.get(url,{ body: "" })
        .map(res => {
          let json = res.json();
          this.loaderService.displayLoader(false); // disable spinner
          return json;
        })
    } else {
      return Observable.of([]);
    }
  }


}
