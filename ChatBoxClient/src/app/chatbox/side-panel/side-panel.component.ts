import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { SidePanelModel } from './side-panel.model';
import { User } from '../../shared/user/user.model';

@Component({
  selector: 'app-side-panel',
  templateUrl: './side-panel.component.html',
  styleUrls: ['./side-panel.component.css']
})
export class SidePanelComponent implements OnInit {
  @Input() model: SidePanelModel;
  
  @Output() createChat: EventEmitter<User> = new EventEmitter<User>();

  constructor() { }

  ngOnInit() {
  }

  onCreateChat(user: User) {
    this.createChat.emit(user);
  }

}
