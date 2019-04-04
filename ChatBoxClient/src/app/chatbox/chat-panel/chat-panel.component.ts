import { Component, OnInit, Input } from '@angular/core';
import { ChatBoxModel } from '../chatbox.model';

@Component({
  selector: 'app-chat-panel',
  templateUrl: './chat-panel.component.html',
  styleUrls: ['./chat-panel.component.css']
})
export class ChatPanelComponent implements OnInit {
  @Input() model: ChatBoxModel;

  constructor() { }

  ngOnInit() {
  }

}
