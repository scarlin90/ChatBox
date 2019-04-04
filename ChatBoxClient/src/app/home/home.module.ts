import { NgModule } from "@angular/core";

import { HomeComponent } from "./home.component";
import { HomeRoutingModule } from "./home-routing.module";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
   
  @NgModule({
    imports: [
      CommonModule,
      FormsModule,
      HomeRoutingModule
    ],
    declarations: [
      HomeComponent
    ],
    exports: [
      HomeComponent
    ]
  })
  export class HomeModule { }