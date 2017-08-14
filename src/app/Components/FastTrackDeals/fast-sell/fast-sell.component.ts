import { FastdealServices } from './../../../service/FastdealServices/FastdealServices';
import { NgbDropdown, NgbDropdownToggle } from './../../../directive/ngb-dropdown-toggle.directive';
import { TransactionRequestModel } from './../../../models/TransactionRequestModel';
import { RegisterService } from './../../../service/registerservice/register.service';
import { Cities } from './../../../models/cities';
import { ValidationmessageserviceService } from './../../../service/validationmessageservice.service';
import { SharedService } from './../../../service/shared.service';
import { RegisterInterface } from './../../../interface/register-interface';
import { RegisterComponent } from './../../../register/register.component';
import { Registermodel} from './../../../models/registermodel';
import { LoginModel } from './../../../models/login';
import { AppSettings } from './../../../app-settings';

import { Router } from '@angular/router';

import { Component, OnInit, ElementRef, Input } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder, AbstractControl, FormArray } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/throttleTime';
import 'rxjs/add/observable/fromEvent';

import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { LocalStorage, SessionStorage } from "angular2-localstorage/WebStorage";
import { SafeHtml,DomSanitizationService } from "@angular/platform-browser";
import { UserType } from "../../../enums/user-type.enum";
import { Responsecode } from "../../../enums/responsecode.enum";
import { NgFor } from "@angular/common";




@Component({
  selector: 'app-fast-sell',
  templateUrl: 'fast-sell.component.html',
  styleUrls: ['fast-sell.component.css']
})
export class FastSellComponent {



   _fastsellcpForm: FormGroup;
   





  
    constructor(myElement: ElementRef, private _sharedservice: SharedService, private _http: Http,private _sanitizer:DomSanitizationService,private _fb: FormBuilder,private _registerservice: RegisterService,private _router: Router,private _fastdealservice: FastdealServices) {
   
    }

 ngOnInit() {
  
     this._fastsellcpForm =this._fb.group({
           Amount: new FormControl('', [Validators.required,ValidationmessageserviceService.onlynumber,ValidationmessageserviceService.BtcprecisionValidation]),
           ReciveAmount: new FormControl('', [Validators.required,ValidationmessageserviceService.onlynumber,ValidationmessageserviceService.FiatprecisionValidation]),
         
           TransferTimeDuration: new FormControl('', [Validators.required]),
           IsAutoPost:new FormControl('', [Validators.required]),
          fastsellsubformarray: this._fb.array([]),
          fastsellbankdeatilsarray: this._fb.array([])
       });

  this.addfastsellsubform();

    }

 initfastsellBankform() {
        return this._fb.group({
           banklist: new FormControl(''),
           bankname: new FormControl('', [Validators.required]),
           accountnumber: new FormControl('', [Validators.required]),
           IFSCCode: new FormControl('', [Validators.required]),
        });
    }

   addfastsellBankform() {
       this.removefastsellsubform();
        const control = <FormArray>this._fastsellcpForm.controls['fastsellbankdeatilsarray'];
        if(control.controls.length==0){
 const addrCtrl = this.initfastsellBankform();
   control.push(addrCtrl);
        }
     }

    



 initfastsellsubform() {
        return this._fb.group({
           StartCityID: new FormControl('', [Validators.required,ValidationmessageserviceService.onlynumber ]),
           SMP: new FormControl('', [Validators.required]),
        });
    }

    addfastsellsubform() {
        this.removefastsellBankform();
        const control = <FormArray>this._fastsellcpForm.controls['fastsellsubformarray'];
        if(control.controls.length==0){
 const addrCtrl = this.initfastsellsubform();
   control.push(addrCtrl);

  
        }
     }

    removefastsellsubform() {
        console.log("removefastsellsubform");
        const control = <FormArray>this._fastsellcpForm.controls['fastsellsubformarray'];
       control.removeAt(0);
    
        ///  control.removeAt(i+1);
    }


    removefastsellBankform() {
        console.log("removefastsellsubform");
        const control = <FormArray>this._fastsellcpForm.controls['fastsellbankdeatilsarray'];
       control.removeAt(0);
      
    }

doSomethingnew(event){

  event.stopPropagation();
}


doSomething(model){
  //event.stopPropagation();
  console.log("model");
console.log(model);
if(model==6){
this.selectedtimeduration = this.timedurationlist[0];
}
else if(model==12)
{
this.selectedtimeduration = this.timedurationlist[1];
}
else if(model==24)
{
this.selectedtimeduration = this.timedurationlist[2];
}
else if(model==48)
{
this.selectedtimeduration = this.timedurationlist[3];
}

this._fastsellcpForm.controls['TransferTimeDuration'].setValue(model);
 return false;

}

timedurationlist = [{key: 6,value:"6 HRS"}, {key:12,value:"12 HRS"}, {key: 24,value:"24 HRS"},{key: 48,value:"48 HRS"}];
selectedtimeduration = this.timedurationlist[1];



onSubmit({ value, valid }: { value: TransactionRequestModel, valid: boolean }) {

console.log("valid");
console.log(valid);
console.log("value");
console.log(value);



  this._fastdealservice.PostFastDeal(value).debounceTime(1200).subscribe(result =>{
 
 console.log("------result------");
 console.log(result);

  });

}


}

/*
    pushItem(element) {
        this.SuggestionfilteredList.push(element);
    }
*/
 
