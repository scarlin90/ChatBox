import { Component, OnInit } from '@angular/core';

import { HubConnection } from '@aspnet/signalr';
import * as signalR from '@aspnet/signalr';
import { UserService } from '../shared/user/user.service';
import { User } from '../shared/user/user.model';

@Component({
  selector: 'app-home-component',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

    public loggedInUser: User;

    constructor(private _userService:UserService){}

    ngOnInit() {
        this.loggedInUser = this._userService.getLoginUser();
    }
}