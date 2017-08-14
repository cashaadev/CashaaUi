/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { MydealComponent } from './mydeal.component';

describe('MydealComponent', () => {
  let component: MydealComponent;
  let fixture: ComponentFixture<MydealComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MydealComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MydealComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
