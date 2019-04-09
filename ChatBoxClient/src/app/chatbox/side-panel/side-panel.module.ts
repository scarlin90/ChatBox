import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidePanelComponent } from './side-panel.component';
import { ContactListModule } from './contact-list/contact-list.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ContactListModule
  ],
  declarations: [SidePanelComponent],
  exports: [SidePanelComponent]
})
export class SidePanelModule { }
