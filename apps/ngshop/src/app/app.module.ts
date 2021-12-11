import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { UiModule} from '@holystone/ui';
import { ProductsModule } from '@holystone/products'
import { OrdersModule } from '@holystone/orders';
import { ToastModule } from 'primeng/toast';


import { AppComponent } from './app.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { NavComponent } from './shared/nav/nav.component'
import { NgxStripeModule } from 'ngx-stripe';
import { MessageService } from 'primeng/api';
import { MessagesComponent } from './shared/messages/messages.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { JwtInterceptor, UsersModule } from '@holystone/users';

const routes: Routes = [
  {path:'', component:HomePageComponent},

]

@NgModule({
  declarations: [AppComponent, HomePageComponent, HeaderComponent, FooterComponent, NavComponent, MessagesComponent,],
  imports: [NgxStripeModule.forRoot('pk_test_51K3L0WJgSiFdUOfY8CxGRShpB2iKQznrToY5ZbekarOGn0xLwJTbYZYUWDkdOHMDeKY1g3vUSjIbx3iSN5dPYMDs00SXh5cqEN'),UsersModule,BrowserModule,UiModule,RouterModule.forRoot(routes),ProductsModule,HttpClientModule,OrdersModule,ToastModule,BrowserAnimationsModule,StoreModule.forRoot({}),EffectsModule.forRoot([])],
  providers: [MessageService,{provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true}],
  bootstrap: [AppComponent],
})
export class AppModule {}
