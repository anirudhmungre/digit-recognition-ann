import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MaterialDesignModule} from './material-design/material-design.module';
import { HomeComponent } from './pages/home/home.component';
import { TilesComponent } from './components/tiles/tiles.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { LoaderComponent } from './components/shared/loader/loader.component';
import {LoaderService} from './services/loader.service';
import {LoaderInterceptor} from './interceptors/loader.interceptor';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';

const config: SocketIoConfig = { url: 'http://localhost:5000', options: {} };

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    TilesComponent,
    LoaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialDesignModule,
    SocketIoModule.forRoot(config),
    HttpClientModule
  ],
  providers: [
    LoaderService,
    { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
