/* tslint:disable:no-unused-variable */

import { By }           from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { addProviders, async, inject } from '@angular/core/testing';
import { BaseComponentComponent } from './base-component.component';

describe('Component: BaseComponent', () => {
  it('should create an instance', () => {
    let component = new BaseComponentComponent();
    expect(component).toBeTruthy();
  });
});
