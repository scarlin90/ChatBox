import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatPanelComponent } from './chat-panel.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [ChatPanelComponent],
  exports: [ChatPanelComponent]
})
export class ChatPanelModule { }
