import { NgModule } from "@angular/core";

import { HomeComponent } from "./home.component";
import { HomeRoutingModule } from "./home-routing.module";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { ChatboxModule } from "../chatbox/chatbox.module";
   
  @NgModule({
    imports: [
      CommonModule,
      FormsModule,
      HomeRoutingModule,
      ChatboxModule
    ],
    declarations: [
      HomeComponent
    ],
    exports: [
      HomeComponent
    ]
  })
  export class HomeModule { }