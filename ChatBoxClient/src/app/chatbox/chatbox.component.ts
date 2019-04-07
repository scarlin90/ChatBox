import { Component, OnInit } from "@angular/core";
import { ChatBoxModel } from "./chatbox.model";
import { UserService } from "../shared/user/user.service";
import { FormBuilder } from "@angular/forms";
import { MessageModel, ChatPanelModel, ChatType } from "./chat-panel/chat-panel.model";
import { User } from "../shared/user/user.model";
import { SignalRService } from "../shared/signalr/signalr.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-chatbox",
  templateUrl: "./chatbox.component.html",
  styleUrls: ["./chatbox.component.css"]
})
export class ChatboxComponent implements OnInit {
  public model: ChatBoxModel;
  public loggedInUser: User;
  public isCollapsed: boolean = true;
  public isMaximized: boolean;

  constructor(
    private _router: Router,
    private _userService: UserService,
    private _signalRService: SignalRService,
    private _formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.loggedInUser = this._userService.getLoginUser();

    if(!this.loggedInUser) {
      this._router.navigate(['/login']);
    }

    this.model = {
      createGroupName: '',      
      activeChat: {
        type: ChatType.Private,
        chatHistory: [],
        chatId: undefined,
        recipients: []
      },
      sidePanelModel: {
        groups: [],
        contactListModel: {
          loggedInUser: this.loggedInUser,
          users: this._userService.getContactableUsers()
        },
        chatPanels: []
      },
    };

    this._signalRService.on('receivePrivateMessage', (message: string) => {
      let convertedMessageModel = JSON.parse(message) as MessageModel;
      convertedMessageModel.user = this._userService.getUserByUsername(convertedMessageModel.sender);
      let chatId = `${ChatType.Private}-${convertedMessageModel.sender}-${this.loggedInUser.username}`;
      console.log('receivePrivateMessage', message);
      console.log('chatId', chatId);
      this.receiveMessage(chatId, ChatType.Private, convertedMessageModel);

    });

    this._signalRService.on('receiveCreateGroup', (groupName: string) => {
      this.model.sidePanelModel.groups.push({
        name: groupName,
        isMember: false
      });
      console.log('receiveCreateGroup', groupName);
    });

    this._signalRService.on('receiveJoinGroupMessage', (groupName: string) => {
      console.log('receiveJoinGroupMessage', groupName);
      this.model.sidePanelModel.groups.find(g => g.name === groupName).isMember = true;
    });

    this._signalRService.on('receiveOthersGroupMessage', (groupName:string ,message: string) => {
      let convertedMessageModel = JSON.parse(message) as MessageModel;
      convertedMessageModel.user = this._userService.getUserByUsername(convertedMessageModel.sender);
      let chatId = groupName;

      console.log('receiveOthersGroupMessage', message);
      console.log('chatId', chatId);
      this.receiveMessage(chatId, ChatType.Group, convertedMessageModel);
    });
  }

  onMessageSend(message: MessageModel) {
    message.sender = this.loggedInUser.username;
    message.user = this.loggedInUser;
    console.log("this.model 2", this.model);

    this.model.activeChat.chatHistory.push(message);

    
    console.log(`recipients 0: ${this.model.activeChat.recipients[0]}`);
    const recipientUser = this._userService.getUserByUsername(this.model.activeChat.recipients[0]);

    if(this.model.activeChat.type === ChatType.Private) {
      console.log(`SendToConnection: ${recipientUser.connectionId}`, message);
      this._signalRService.hubConnection.invoke(
        "SendToConnection",
        recipientUser.connectionId,
        JSON.stringify(message)
      );
    } else {
      console.log(`SendToOthersInGroup: ${this.model.activeChat.chatId}`, message);
      this._signalRService.hubConnection.invoke(
        "SendToOthersInGroup",
        this.model.activeChat.chatId,
        JSON.stringify(message)
      );
    }
    
  }

  onCreateChat(user: User) {
    console.log('onCreateChat', user);
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
    this.model.sidePanelModel.chatPanels.push(chat);

  }

  onCreateGroup(groupName:string) {
    if(!this.model.sidePanelModel.groups.find(g => g.name === groupName)) {
      this._signalRService.hubConnection.invoke(
        "CreateGroup",
        groupName
      );
    }
  }

  onJoinGroup(groupName:string) {
    const chat = {
      chatId: groupName,
      type: ChatType.Group,
      recipients: [this.loggedInUser.username],
      form: this._formBuilder.group({
        sendMessage: [""]
      }),
      chatHistory: []
    };

    this.model.activeChat = chat;
    this.model.sidePanelModel.chatPanels.push(chat);

    console.log(' this.loggedInUser.connectionId', this.loggedInUser.connectionId);

    this._signalRService.hubConnection.invoke(
      "JoinGroup",
      this.loggedInUser.connectionId,
      this.model.activeChat.chatId
    );
  }

  onLeaveGroup(groupName:string) {
    this.model.activeChat = {
      type: ChatType.Private,
      chatHistory: [],
      chatId: undefined,
      recipients: []
    };

    let chatpanelIndex = this.model.sidePanelModel.chatPanels.findIndex(cp => cp.chatId === groupName);
    console.log('chatpanelIndex', chatpanelIndex);
    if(chatpanelIndex !== -1){
      this.model.sidePanelModel.chatPanels.splice(chatpanelIndex,1);
    }

    let group = this.model.sidePanelModel.groups.find(g => g.name === groupName);
    console.log('group', group);
    if(group) {
      group.isMember = false;
    }

    console.log('this.model.sidePanelModel', this.model.sidePanelModel);

    this._signalRService.hubConnection.invoke(
      "LeaveGroup",
      this.loggedInUser.connectionId,
      groupName
    );
  }


  onSelectChat(chatPanel: ChatPanelModel){
    console.log('selected panel', chatPanel);
    this.model.activeChat = chatPanel;
  }

  toggleCollapse() {
    this.isCollapsed = !this.isCollapsed;
  }

  toggleMaximize() {
    this.isMaximized = !this.isMaximized;
  }

  private receiveMessage(chatId:string, chatType: ChatType, message: MessageModel) {

      const existingChatPanel = this.model.sidePanelModel.chatPanels.find(cp => cp.chatId === chatId);
      
      console.log('***** existingChatPanel', existingChatPanel);
      // existing add message to current chat
      if(existingChatPanel) {
        existingChatPanel.chatHistory.push(message);
      } else {
        // if new 
        // and chat is active
        
        if(this.model.activeChat.chatId === chatId) {
          console.log('***** new chat active');
          this.model.activeChat.chatHistory.push(message);
          this.model.activeChat.chatId = chatId;
          this.model.activeChat.recipients.push(message.sender);
          this.model.activeChat.recipients.push(this.loggedInUser.username);
          this.model.sidePanelModel.chatPanels.push(this.model.activeChat);
        } else {
          console.log('***** new chat inactive');
          this.model.sidePanelModel.chatPanels.push({
            type: chatType,
            chatId: chatId,
            chatHistory: [message],
            recipients: [
              message.sender,
              this.loggedInUser.username
            ]
          });
        }  
      }
  }
}
