import { Component, OnInit } from '@angular/core';

import { HubConnection } from '@aspnet/signalr';
import * as signalR from '@aspnet/signalr';

import { User } from '../shared/user/user.model';
import { UserService } from '../shared/user/user.service';

@Component({
  selector: 'app-user-selection',
  templateUrl: './user-selection.component.html',
  styleUrls: ['./user-selection.component.css']
})
export class UserSelectionComponent implements OnInit {

  public users: User[] = [];
  public loggedInUser: User;

  private _hubConnection: HubConnection | undefined;

  constructor(private _userService:UserService) { }

  ngOnInit() {
    this.users = this._userService.getUsers();

    this._hubConnection = new signalR.HubConnectionBuilder()
            .withUrl('http://localhost:5000/chatbox')
            .configureLogging(signalR.LogLevel.Information)
            .build();

        this._hubConnection.start().catch(err => console.error(err.toString()));
        this._hubConnection.on('SendUserStatusUpdate', (user: User) => {
          console.log("onSendUserStatusUpdate", user);
           this._userService.updateUserActiveStatus(user, true);
        });
  }

  loginUser(user:User) {
    this._userService.setLoginUser(user);
    this.loggedInUser = this._userService.getLoginUser();
    
  }

  userStatusUpdate(user:User) {
    console.log('userStatusUpdate', user)
    if (this._hubConnection) {
      this._hubConnection.invoke('SendUserStatusUpdate', user);
    }
  }

}
