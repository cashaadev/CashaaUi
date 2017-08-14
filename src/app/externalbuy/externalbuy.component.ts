import { CountdowntimerComponent } from './../countdowntimer/countdowntimer.component';
import { InviteComponent } from './../invite/invite.component';
import { DelayDirective } from './../directive/btc2bid-timer.directive';
import {Component, ComponentRef, ViewContainerRef, ComponentFactoryResolver,
        ViewChild, OnInit, OnDestroy} from '@angular/core';

@Component({
  selector: 'app-externalbuy',
  templateUrl: 'externalbuy.component.html',
  styleUrls: ['externalbuy.component.css']
})
export class ExternalbuyComponent implements OnInit {

  @ViewChild('dynamicTarget', { read: ViewContainerRef })
    private dynamicTarget: any;

  constructor(private resolver: ComponentFactoryResolver) { }

   private componentReference: ComponentRef<any>;

     protected entity = { 
       
        description: "This is External Buy" 
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
            console.log('scrolled down!!')
    }
 
    onScrollUp () {
    	console.log('scrolled up!!')
    }

   clicked(){

        let componentFactory = this.resolver.resolveComponentFactory(InviteComponent);
        this.componentReference = this.dynamicTarget.createComponent(componentFactory);
    }



}