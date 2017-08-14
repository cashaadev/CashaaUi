/*import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[btc2bid-timer]'
})
export class Btc2bidTimer {

  constructor(el:ElementRef) { 

    el.nativeElement.style.background="yellow";
  }

}*/


import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appDelay]'
})
export class DelayDirective {


  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainerRef: ViewContainerRef
  ) { }

  @Input()
  set appDelay(time: number) {

  

    setTimeout(
      () => {
       
        this.viewContainerRef.createEmbeddedView(this.templateRef);
      },
      time);
  }
}