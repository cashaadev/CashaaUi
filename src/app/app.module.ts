import { BaseComponentComponent } from './Components/helpercomponent/base-component/base-component.component';
import { CashaaGoogleSuggestionComponent } from './Components/helpercomponent/cashaa-google-suggestion/cashaa-google-suggestion.component';
import { CashaaCityAutoSuggestionComponent } from './Components/helpercomponent/cashaa-city-auto-suggestion/cashaa-city-auto-suggestion.component';
import { FastDealSubFormComponent } from './Components/FastTrackDeals/fast-deal-sub-form/fast-deal-sub-form.component';
import { FastdealServices } from './service/FastdealServices/FastdealServices';
import { FastSellComponent } from './Components/FastTrackDeals/fast-sell/fast-sell.component';
import { AuthGuard } from './service/auth-guard.service';
import { PubSubService } from './service/pub-sub.service';
import { RegisterService } from './service/registerservice/register.service';
import { SharedService } from './service/shared.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule,Provider,provide } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { XHRBackend, RequestOptions, HttpModule,Http ,ConnectionBackend,HTTP_PROVIDERS} from '@angular/http';
import { HomeComponent } from './home/home.component';
import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';
import { LeftsidebarComponent } from './leftsidebar/leftsidebar.component';
import { RightsidebarComponent } from './rightsidebar/rightsidebar.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';
import { MydealComponent } from './mydeal/mydeal.component';
import { SellbitcoinComponent } from './sellbitcoin/sellbitcoin.component';
import { BuybitcoinComponent } from './buybitcoin/buybitcoin.component';
import { InviteComponent } from './invite/invite.component';
import { BonusComponent } from './bonus/bonus.component';
import { RefundComponent } from './refund/refund.component';
import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { ValidationMessageComponent } from './shared/validation-message/validation-message.component';
import { ValidationmessageserviceService } from './service/validationmessageservice.service';
import { LocalStorageService, LocalStorageSubscriber } from 'angular2-localstorage/LocalStorageEmitter';
import { Ng2AutoCompleteModule } from 'ng2-auto-complete';
import { LoaderComponent } from './loader/loader.component';
import { InfiniteScrollModule } from 'angular2-infinite-scroll';
import { DelayDirective } from './directive/btc2bid-timer.directive';
import { CountdowntimerComponent } from './countdowntimer/countdowntimer.component';
import { ExternalbuyComponent } from './externalbuy/externalbuy.component';
import { ExternalsellComponent } from './externalsell/externalsell.component';
import { NguiAutoCompleteModule } from '@ngui/auto-complete';
import { BanksFormComponent } from './Components/helpercomponent/banks-form/banks-form.component';
import { httpFactory } from "./service/CoustomeHttpService/httpFactory";
import { PreLoaderComponent } from './Components/helpercomponent/pre-loader/pre-loader.component';
import { LoaderService } from "./service/loader-service.service";

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'SignUp', component: RegisterComponent },
  { path: 'SignIn', component: LoginComponent },
  { path: 'mydeal', component: MydealComponent,canActivate:[AuthGuard]},
  { path: 'sellbitcoin', component: SellbitcoinComponent,canActivate:[AuthGuard] },
  { path: 'FastSell', component: FastSellComponent,canActivate:[AuthGuard]},
  { path: 'buybitcoin', component: BuybitcoinComponent,canActivate:[AuthGuard] },
  { path: 'bonus', component: BonusComponent,canActivate:[AuthGuard] },
  { path: 'refund', component: RefundComponent ,canActivate:[AuthGuard]},
  { path: 'invitefreind', component: InviteComponent,canActivate:[AuthGuard] },
  { path: 'ExternalBuy', component: ExternalbuyComponent },
  { path: 'ExternalSell', component: ExternalsellComponent },
];
@NgModule({
  declarations: [
    AppComponent,
    FastSellComponent,
    HomeComponent,
    RegisterComponent,
    LeftsidebarComponent,
    RightsidebarComponent,
    FooterComponent,
    HeaderComponent,
    LoginComponent,
    MydealComponent,
    SellbitcoinComponent,
    BuybitcoinComponent,
    InviteComponent,
    BonusComponent,
    RefundComponent,
    ValidationMessageComponent,
    LoaderComponent,
    DelayDirective,
    CountdowntimerComponent,
    ExternalbuyComponent,
    ExternalsellComponent,
    FastDealSubFormComponent, CashaaCityAutoSuggestionComponent, CashaaGoogleSuggestionComponent, BanksFormComponent, PreLoaderComponent, BaseComponentComponent
    ],
  imports: [
    RouterModule.forRoot(routes),
   // AlertModule,
    BrowserModule,
    FormsModule,
    HttpModule,
    Ng2AutoCompleteModule,
     ReactiveFormsModule,
    InfiniteScrollModule ,
     NguiAutoCompleteModule,
    //  BrowserAnimationsModule,
       // BusyModule
  ],
  providers: [AuthGuard,ValidationmessageserviceService,FastdealServices, LoaderService,SharedService, RegisterService, LocalStorageService,ConnectionBackend,HTTP_PROVIDERS,PubSubService,
  // {provide: Http, useClass: ExtendedHttpService },
   {
      provide: Http,
            useFactory: httpFactory,
            deps: [XHRBackend, RequestOptions,LoaderService]
      // provide: CustomHttpService,
      // useFactory: (backend: XHRBackend, options: RequestOptions,pubser:PubSubService) => {
      //   return new CustomHttpService(backend, options,pubser);
      // },
      // deps: [XHRBackend, RequestOptions,PubSubService]
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
