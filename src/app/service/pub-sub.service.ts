import { ResponseEventEmitter,RequestEventEmitter } from './../models/emitter';

import {Injectable} from '@angular/core';


@Injectable()
export class PubSubService {

  beforeRequest:RequestEventEmitter;
   afterRequest:ResponseEventEmitter;
   constructor(){
       this.beforeRequest = new RequestEventEmitter();
       this.afterRequest = new ResponseEventEmitter();
   }

}
