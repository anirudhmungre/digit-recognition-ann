import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import {MaterialDesignModule} from "./material-design/material-design.module";
import { HomeComponent } from "./pages/home/home.component";
import { NumpadComponent } from "./components/numpad/numpad.component";
import { SocketIoModule, SocketIoConfig } from "ngx-socket-io";
import { StatisticsComponent } from "./components/statistics/statistics.component";
import { NetworkDiagramComponent } from "./components/network-diagram/network-diagram.component";

const config: SocketIoConfig = { url: "http://localhost:5000", options: {} };

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NumpadComponent,
    StatisticsComponent,
    NetworkDiagramComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SocketIoModule.forRoot(config),
    MaterialDesignModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
