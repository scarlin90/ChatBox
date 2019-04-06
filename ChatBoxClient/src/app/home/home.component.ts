import { Component, OnInit } from '@angular/core';

import { HubConnection } from '@aspnet/signalr';
import * as signalR from '@aspnet/signalr';

@Component({
  selector: 'app-home-component',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
    // private _hubConnection: HubConnection | undefined;
    // public async: any;
    // message = '';
    // messages: string[] = [];
 
    constructor() {
    }
 
    // public sendMessage(): void {
    //     if (this._hubConnection) {
    //         this._hubConnection.invoke('SendMessage', 'test user', this.message);
    //     }
    // }
 
    ngOnInit() {
        // this._hubConnection = new signalR.HubConnectionBuilder()
        //     .withUrl('http://localhost:5000/chatbox')
        //     .configureLogging(signalR.LogLevel.Information)
        //     .build();

        // this._hubConnection.start().catch(err => console.error(err.toString()));
        // this._hubConnection.on('SendMessage', (user: any, message: any,) => {
        //     const received = `${user}: ${message} `;
        //     this.messages.push(received);
        // });
    }
}