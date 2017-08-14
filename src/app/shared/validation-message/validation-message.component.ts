import { FormControl, FormGroup } from '@angular/forms';
import { ValidationmessageserviceService } from './../../service/validationmessageservice.service';
import { Component, OnInit, Input,Output } from '@angular/core';


@Component({
  selector: 'app-validation-message',
  templateUrl: 'validation-message.component.html',
  styleUrls: ['validation-message.component.css'],

})
export class ValidationMessageComponent  {


  @Input() control: FormControl;
 @Input() controlname: string;
  @Input() confirmcontrol: FormControl;


  constructor() { }

  get errorMessage() {



  
//console.log(this.confirmcontrol)



  
  
    for (let propertyName in this.control.errors) {
      if (this.control.errors.hasOwnProperty(propertyName) && this.control.touched) {
  
        return ValidationmessageserviceService.getValidatorErrorMessage(propertyName, this.control.errors[propertyName],"confirmcheck",this.controlname);
      }
    }

    return null;
  }
}
