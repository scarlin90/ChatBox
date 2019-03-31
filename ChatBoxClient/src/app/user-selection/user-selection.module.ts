import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserSelectionComponent } from './user-selection.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [UserSelectionComponent],
  entryComponents: [UserSelectionComponent],
  exports:[UserSelectionComponent]
})
export class UserSelectionModule { }
