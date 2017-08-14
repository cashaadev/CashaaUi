/* tslint:disable:no-unused-variable */

import { By }           from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { addProviders, async, inject } from '@angular/core/testing';
import { ValidationMessageComponent } from './validation-message.component';

describe('Component: ValidationMessage', () => {
  it('should create an instance', () => {
    let component = new ValidationMessageComponent();
    expect(component).toBeTruthy();
  });
});
