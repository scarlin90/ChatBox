import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { SidePanelModel } from './side-panel.model';
import { User } from '../../shared/user/user.model';
import { ChatPanelModel } from '../chat-panel/chat-panel.model';

@Component({
  selector: 'app-side-panel',
  templateUrl: './side-panel.component.html',
  styleUrls: ['./side-panel.component.css']
})
export class SidePanelComponent implements OnInit {
  @Input() model: SidePanelModel;
  
  @Output() createChat: EventEmitter<User> = new EventEmitter<User>();
  @Output() createGroupChat: EventEmitter<User> = new EventEmitter<User>();
  @Output() addGroup: EventEmitter<string> = new EventEmitter<string>();
  @Output() joinGroup: EventEmitter<string> = new EventEmitter<string>();
  @Output() leaveGroup: EventEmitter<string> = new EventEmitter<string>();
  @Output() selectChat: EventEmitter<ChatPanelModel> = new EventEmitter<ChatPanelModel>();

  public isCollapsed: boolean;

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

  onAddGroup(groupName: string) {
    this.addGroup.emit(groupName);
  }

  onSelectChat(chatPanel:ChatPanelModel) {
    this.selectChat.emit(chatPanel);
  }
}
