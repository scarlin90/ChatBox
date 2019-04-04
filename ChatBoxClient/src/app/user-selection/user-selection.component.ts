import { Component, OnInit } from '@angular/core';

import { HubConnection } from '@aspnet/signalr';
import * as signalR from '@aspnet/signalr';

import { User } from '../shared/user/user.model';
import { UserService } from '../shared/user/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-selection',
  templateUrl: './user-selection.component.html',
  styleUrls: ['./user-selection.component.css']
})
export class UserSelectionComponent implements OnInit {

  public users: User[] = [];
  public loggedInUser: User;

  private _hubConnection: HubConnection | undefined;

  constructor(private router: Router, private _userService:UserService) { }

  ngOnInit() {
    this.users = this._userService.getUsers();

    this._hubConnection = new signalR.HubConnectionBuilder()
            .withUrl('http://localhost:5000/chatbox')
            .configureLogging(signalR.LogLevel.Information)
            .build();
    this._hubConnection.start().catch(err => console.error(err.toString()));
        
        this._hubConnection.on('SendUserStatusUpdate', (user: string) => {
          console.log("onSendUserStatusUpdate", user);
           let convertedUser = JSON.parse(user) as User;
           console.log('convertedUser', convertedUser);
           this._userService.updateUserActiveStatus(convertedUser, true);
        });
        
        // this._hubConnection.on('OnConnectedAsync', (connectionId: string) => {
        //   console.log('onConnection', connectionId);
        //    this._userService.updateUserConnection(this._userService.getLoginUser(), connectionId);
        // });

        this._hubConnection.on('getMyConnection', (connectionId: string) => {
          console.log('onConnection', connectionId);
           this._userService.updateUserConnection(this._userService.getLoginUser(), connectionId);
           console.log('user connection', this._userService.getLoginUser());
           if (this._hubConnection) {
              this._hubConnection.invoke('RecieveUserConnection', JSON.stringify(this._userService.getLoginUser()));
           }
        });

        this._hubConnection.on('recieveUserConnection', (user: string) => {
          let convertedUser = JSON.parse(user) as User;
          console.log('recieveUserConnection', convertedUser);
           this._userService.updateUserConnection(convertedUser, convertedUser.connectionId);
           console.log('user connection', this._userService.getLoginUser());
        });

        
  }

  loginUser(user:User) {
    this._userService.setLoginUser(user);
    this.loggedInUser = this._userService.getLoginUser();
    this.sendUserStatusUpdate(user);
    this.router.navigate(['/home']);
  }

  async sendUserStatusUpdate(user:User) {
    console.log('userStatusUpdate', user)
    if (this._hubConnection) {
      this._hubConnection.invoke('Echo', JSON.stringify(user));
      this._hubConnection.invoke('SendUserStatusUpdate', JSON.stringify(user));
    }
  }

  logConnection(connectionId: string){
    console.log('My Connection', connectionId);
  }



}
