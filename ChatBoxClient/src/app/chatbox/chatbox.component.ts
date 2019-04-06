import { Component, OnInit } from "@angular/core";
import { ChatBoxModel } from "./chatbox.model";
import { UserService } from "../shared/user/user.service";
import { FormBuilder } from "@angular/forms";
import { MessageModel, ChatPanelModel, ChatType } from "./chat-panel/chat-panel.model";
import { User } from "../shared/user/user.model";
import { SignalRService } from "../shared/signalr/signalr.service";

@Component({
  selector: "app-chatbox",
  templateUrl: "./chatbox.component.html",
  styleUrls: ["./chatbox.component.css"]
})
export class ChatboxComponent implements OnInit {
  public model: ChatBoxModel;
  public loggedInUser: User;

  constructor(
    private _userService: UserService,
    private _signalRService: SignalRService,
    private _formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.loggedInUser = this._userService.getLoginUser();

    this.model = {
      activeChat: {
        type: ChatType.Private,
        chatHistory: [],
        chatId: undefined,
        recipients: []
      },
      sidePanelModel: {
        contactListModel: {
          loggedInUser: this.loggedInUser,
          users: this._userService.getContactableUsers()
        }
      },
      chatPanels: []
    };

    this._signalRService.on('receivePrivateMessage', (message: string) => {
      let convertedMessageModel = JSON.parse(message) as MessageModel;
      console.log('Send Recieved', message);

      const chatId = `${ChatType.Private}-${convertedMessageModel.sender}-${this.loggedInUser.username}`;
      const existingChatPanel = this.model.chatPanels.find(cp => cp.chatId === chatId);
      
      console.log('***** existingChatPanel', existingChatPanel);
      // existing add message to current chat
      if(existingChatPanel) {
        existingChatPanel.chatHistory.push(convertedMessageModel);
      } else {
        // if new 
        // and chat is active
        
        if(this.model.activeChat.chatId === chatId) {
          console.log('***** new chat active');
          this.model.activeChat.chatHistory.push(convertedMessageModel);
          this.model.activeChat.chatId = chatId;
          this.model.activeChat.recipients.push(convertedMessageModel.sender);
          this.model.activeChat.recipients.push(this.loggedInUser.username);
          this.model.chatPanels.push(this.model.activeChat);
        } else {
          console.log('***** new chat inactive');
          this.model.chatPanels.push({
            type: ChatType.Private,
            chatId: chatId,
            chatHistory: [convertedMessageModel],
            recipients: [
              convertedMessageModel.sender,
              this.loggedInUser.username
            ]
          });
        }
        
  
        
      }
      
    });
  }

  onMessageSend(message: MessageModel) {
    message.sender = this.loggedInUser.username;
    console.log("this.model 2", this.model);

    this.model.activeChat.chatHistory.push(message);

    
    console.log(`recipients 0: ${this.model.activeChat.recipients[0]}`);
    const recipientUser = this._userService.getUserByUsername(this.model.activeChat.recipients[0]);

    console.log(`send to: ${recipientUser.connectionId}`);
    this._signalRService.hubConnection.invoke(
      "SendToConnection",
      recipientUser.connectionId,
      JSON.stringify(message)
    );
  }

  onCreateChat(user: User) {

    const chat = {
      chatId: `${ChatType.Private}-${user.username}-${this.loggedInUser.username}`,
      type: ChatType.Private,
      recipients: [user.username, this.loggedInUser.username],
      form: this._formBuilder.group({
        sendMessage: [""]
      }),
      chatHistory: []
    };

    this.model.activeChat = chat;
    this.model.chatPanels.push(chat);

  }

  selectChat(chatPanel: ChatPanelModel){
    console.log('selected panel', chatPanel);
    this.model.activeChat = chatPanel;
  }
}
