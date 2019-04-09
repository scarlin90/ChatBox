import { Component, OnInit } from '@angular/core';

import { HubConnection } from '@aspnet/signalr';
import * as signalR from '@aspnet/signalr';

import { User } from '../shared/user/user.model';
import { UserService } from '../shared/user/user.service';
import { Router } from '@angular/router';
import { SignalRService } from '../shared/signalr/signalr.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public users: User[] = [];
  public loggedInUser: User;

  private _hubConnection: HubConnection | undefined;

  constructor(
    private router: Router, 
    private _userService:UserService,
    private _signalRService:SignalRService) { }

  ngOnInit() {
    this.users = this._userService.getUsers();

    this._signalRService.createConnection({
      logLevel: signalR.LogLevel.Information,
      url: 'http://localhost:5000/chatbox'
    });
        
    this._signalRService.on('SendUserStatusUpdate', (user: string) => {
        let convertedUser = JSON.parse(user) as User;
        this._userService.updateUserActiveStatus(convertedUser, true);
    });

    this._signalRService.on('getMyConnection', (connectionId: string) => {
        this._userService.updateUserConnection(this._userService.getLoginUser(), connectionId);
        this._signalRService.hubConnection.invoke('SendUserConnection', JSON.stringify(this._userService.getLoginUser()));
        
    });

    this._signalRService.on('recieveUserConnection', (user: string) => {
      let convertedUser = JSON.parse(user) as User;
        this._userService.updateUserConnection(convertedUser, convertedUser.connectionId);
    });

        
  }

  loginUser(user:User) {
    this._userService.setLoginUser(user);
    this.loggedInUser = this._userService.getLoginUser();
    this.sendUserStatusUpdate(user);
    this.router.navigate(['/home']);
  }

  async sendUserStatusUpdate(user:User) {
      this._signalRService.hubConnection.invoke('Echo', JSON.stringify(user));
      this._signalRService.hubConnection.invoke('SendUserStatusUpdate', JSON.stringify(user));
  }

  logConnection(connectionId: string){
    console.log('My Connection', connectionId);
  }



}
