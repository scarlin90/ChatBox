import { Injectable } from '@angular/core';
import { HubConnection } from '@aspnet/signalr';
import * as signalR from '@aspnet/signalr';

import { signalRConfig } from './signalr-config.model';

@Injectable()
export class SignalRService {

  public hubConnection: HubConnection | undefined;

  constructor() { }

  createConnection(connection:signalRConfig): any {
    this.hubConnection = new signalR.HubConnectionBuilder()
            .withUrl(connection.url)
            .configureLogging(connection.logLevel)
            .build();

    this.hubConnection.start().catch(err => console.error(err.toString()));
  }

  on(methodName: string, newMethod: (...args: any[]) => void): void {
    this.hubConnection.on(methodName, newMethod);
  }
}
