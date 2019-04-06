import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { MessageModel, ChatPanelModel } from './chat-panel.model';

@Component({
  selector: 'app-chat-panel',
  templateUrl: './chat-panel.component.html',
  styleUrls: ['./chat-panel.component.css']
})
export class ChatPanelComponent implements OnInit {
  @Input() model: ChatPanelModel;

  @Output() messageSend: EventEmitter<MessageModel> = new EventEmitter<MessageModel>();

  public messageBody: string;

  constructor() { }

  ngOnInit() {
    this.messageBody = '';
  }

  onMessageSend() {
    this.messageSend.emit({
      body: this.messageBody,
      sender: '',
      timestamp: new Date()
    })
  }

}
