import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatboxComponent } from './chatbox.component';
import { SidePanelModule } from './side-panel/side-panel.module';

@NgModule({
  imports: [
    CommonModule,
    SidePanelModule
  ],
  declarations: [ChatboxComponent],
  exports: [ChatboxComponent]
})
export class ChatboxModule { }
