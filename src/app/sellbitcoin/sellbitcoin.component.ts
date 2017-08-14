import { CountdowntimerComponent } from './../countdowntimer/countdowntimer.component';
import { InviteComponent } from './../invite/invite.component';
import { DelayDirective } from './../directive/btc2bid-timer.directive';
import {Component, ComponentRef, ViewContainerRef, ComponentFactoryResolver,
        ViewChild, OnInit, OnDestroy} from '@angular/core';
@Component({
  selector: 'app-sellbitcoin',
  templateUrl: './sellbitcoin.component.html',
  styleUrls: ['./sellbitcoin.component.css']
})
export class SellbitcoinComponent implements OnInit, OnDestroy  {
    @ViewChild('dynamicTarget', { read: ViewContainerRef })
    private dynamicTarget: any;
constructor(private resolver: ComponentFactoryResolver) {
}
 // We'll need to keep track of our injected component to manage it correctly
   private componentReference: ComponentRef<any>;
     protected entity = { 
        code: "A description of this EntityA description of this <br/>A description of this EntityA description of this <br/>A description of this EntityA description of this <br/>A description of this EntityA description of this <br/>A description of this EntityA description of this <br/>A description of this EntityA description of this <br/>A description of this EntityA description of this <br/>A description of this EntityA description of this <br/>A description of this EntityA description of this <br/>A description of this EntityA description of this <br/>A description of this EntityA description of this <br/>A description of this EntityA description of this <br/>A description of this EntityA description of this <br/>A description of this EntityA description of this <br/>"
        ,description: "A description of this EntityA description of this <br/>A description of this EntityA description of this <br/>A description of this EntityA description of this <br/>A description of this EntityA description of this <br/>A description of this EntityA description of this <br/>A description of this EntityA description of this <br/>A description of this EntityA description of this <br/>" 
      };
    ngOnInit() {
        // Create our component now we're initialised
        let componentFactory = this.resolver.resolveComponentFactory(InviteComponent);
        this.componentReference = this.dynamicTarget.createComponent(componentFactory);
         let component = this.componentReference.instance;
            component.entity = this.entity;
    }
    ngOnDestroy() {
        // If we have a component, make sure we destroy it when we lose our owner
        if (this.componentReference) {
            this.componentReference.destroy();
    }
    }
 onScrollDown () {
 let componentFactory = this.resolver.resolveComponentFactory(InviteComponent);
 this.componentReference = this.dynamicTarget.createComponent(componentFactory);
   let component = this.componentReference.instance;
            component.entity = this.entity;
    }
    onScrollUp () {
    	console.log('scrolled up!!')
    }
    clicked(){
        let componentFactory = this.resolver.resolveComponentFactory(InviteComponent);
        this.componentReference = this.dynamicTarget.createComponent(componentFactory);
    }
}
