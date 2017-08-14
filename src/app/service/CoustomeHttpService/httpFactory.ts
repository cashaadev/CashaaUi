import { LoaderService } from './../loader-service.service';
import { InterceptedHttp } from './InterceptedHttp ';
import {XHRBackend, Http, RequestOptions} from "@angular/http";



export function httpFactory(xhrBackend: XHRBackend, requestOptions: RequestOptions,loaderservice:LoaderService): Http {
    return new InterceptedHttp(xhrBackend, requestOptions,loaderservice);
}