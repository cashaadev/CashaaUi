import { RegisterInterface } from './../interface/register-interface';
import { FormGroup, FormControl } from '@angular/forms';
import { Injectable } from '@angular/core';
import { Validator, AbstractControl, NG_VALIDATORS } from '@angular/forms';
@Injectable()
export class ValidationmessageserviceService {


  formgroupparents: FormGroup;

     static getValidatorErrorMessage(validatorName: string, validatorValue?: any,confirmpassword?:string,controlname?:string) {
        let config = {
            'required': `${controlname} Required`,
            'invalidCity': 'Select from Suggestion',
            'invalidEmailAddress': 'Invalid email address',
            'invalidPassword': 'Invalid password. Password must be at least 6 characters long, and contain a number.',
            'minlength': `Minimum length ${validatorValue.requiredLength}`,
            'EmailInuse': `This Email Id Already taken.`,
            'passwordnotmatch':`Password does not match`,
            'onlynumber' : `${controlname} must be a number .`,
            'Btcprecision':`${controlname} must  precision of 8 digit.`,
            'Fiatprecision':`${controlname} must  precision of 4 digit.`,
        };

        return config[validatorName];
    }


    //^[0-9]*\.[0-9]{2}$ or ^[0-9]*\.[0-9][0-9]$

 static BtcprecisionValidation(control) {

if (control.value.match(/^[0-9]+(\.[0-9]{1,8})?$/)) {
            return null;
        } else {
            return { 'Btcprecision': true };
        }
    }

    static FiatprecisionValidation(control) {

if (control.value.match(/^[0-9]+(\.[0-9]{1,4})?$/)) {
            return null;
        } else {
            return { 'Fiatprecision': true };
        }
    }

    static CityFromsuggestionValidator(control) {

        if (control.value>0) {
            return null;
        } else {
            return { 'invalidCity': true };
        }
    }

    static emailValidator(control) {
        // RFC 2822 compliant regex
        if (control.value.match(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/)) {
            return null;
        } else {
            return { 'invalidEmailAddress': true };
        }
    }

       static emailinuseValidator(control) {
        // RFC 2822 compliant regex
        if (control.value !="amjadlko@gmail.com") {
            return null;
        } else {
            return { 'EmailInuse': true };
        }
    }

    static passwordValidator(control) {
        // {6,100}           - Assert password is between 6 and 100 characters
        // (?=.*[0-9])       - Assert a string has at least one number
        if (control.value.match(/^(?=.*[0-9])[a-zA-Z0-9!@#$%^&*]{6,100}$/)) {
            return null;
        } else {
            return { 'invalidPassword': true };
        }
    }



    static passwordMatchValidator(g: FormGroup) {

 
        

         if (g.get('Password').value === g.get('ConfirmPassword').value) {
            return null;
        } else {
            return { 'passwordnotmatch': true };
        }
    }

static onlynumber(control){

try
{
      if (control.value.match(/^-?\d*\.?\d+$/)) {
            return null;
        } else {
            return { 'onlynumber': true };
        }
}
catch(error)
{
 return null;
}
   
}



 static ConfirmpasswordValidator(control:FormControl) {
        // {6,100}           - Assert password is between 6 and 100 characters
        // (?=.*[0-9])       - Assert a string has at least one number
    
 
 //console.log( control._parent.controls["Password"].values);

if(control.touched)
{

let formgroup:FormGroup=control._parent;

let password:string=formgroup.controls["Password"].value

if(password!==control.value)
 
 {

     return { 'passwordnotmatch': true };
 }



}

 return null;
       
       
    }


}
