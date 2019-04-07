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
  @Output() createGroupChat: EventEmitter<User> = new EventEmitter<User>();
  @Output() joinGroup: EventEmitter<string> = new EventEmitter<string>();
  @Output() leaveGroup: EventEmitter<string> = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {
  }

  onCreateChat(user: User) {
    this.createChat.emit(user);
  }

  onCreateGroupChat(user: User) {
    this.createGroupChat.emit(user);
  }

  onJoinGroup(groupName: string) {
    this.joinGroup.emit(groupName);
  }

  onLeaveGroup(groupName: string) {
    this.leaveGroup.emit(groupName);
  }
}
