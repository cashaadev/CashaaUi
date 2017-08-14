import { AppSettings } from './../app-settings';
import { LoginModel, tokenrespone } from './../models/login';
import { ValidationmessageserviceService } from './../service/validationmessageservice.service';
import { RegisterService } from './../service/registerservice/register.service';
import { Http, Response } from '@angular/http';
import { SharedService } from './../service/shared.service';
import { Component, OnInit, ElementRef } from '@angular/core';
import { Responsecode } from './../enums/responsecode.enum';
import { Router} from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  objLoaderStatus: boolean;
  loginmodel: FormGroup;
   loginresponse: Response;
  constructor(myElement: ElementRef, private _sharedservice: SharedService, private _http: Http,private fb: FormBuilder,private _registerservice: RegisterService,private _router: Router) {
    this.loginmodel =this.fb.group({
           userName: new FormControl('', [Validators.required, ValidationmessageserviceService.emailValidator]),
           password: new FormControl('', [Validators.required]),
       });
  }
doLogin({ value, valid }: { value: LoginModel, valid: boolean }) {
  this._sharedservice.Login(value).debounceTime(400).subscribe(result =>{
this.loginresponse=result;
console.log(Responsecode.UNAUTHORIZED);
if(this.loginresponse.status=Responsecode.OK)
{
this._router.navigate(['mydeal']);
​let responobject:any=this.loginresponse.json();
localStorage.setItem(AppSettings.localtokenkey, responobject.AccessToken);
}
else if(this.loginresponse.status=Responsecode.UNAUTHORIZED)
{
  console.log("un authorized")
    console.log(this.loginresponse)
}
   return false;  
  });
    }
}
