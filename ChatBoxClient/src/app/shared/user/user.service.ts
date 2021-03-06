import { Injectable } from '@angular/core';
import { User, UserList } from './user.model';

@Injectable()
export class UserService {

  private _loggedInUser: User;

  constructor() { }

  getUsers(): User[] {
    return UserList.APPUSERS;
  }
  
  getContactableUsers(): User[] {
    return UserList.APPUSERS.filter(u => u.id !== this._loggedInUser.id);
  }

  getUserByUsername(username:string): User {
    return UserList.APPUSERS.find(u => u.username === username);
  }
  
  setLoginUser(user: User): any {
    this._loggedInUser = user;
    this.updateUserActiveStatus(this._loggedInUser, true);
  }

  updateUserActiveStatus(user: User, isOnline:boolean){
    this.getUsers().map(u => {
      if(u.id === user.id){
        u.isOnline = isOnline;
      }
    })
  }

  updateUserConnection(user: User, connectionId:string){
    this.getUsers().map(u => {
      if(u.id === user.id){
        u.connectionId = connectionId;
      }
    })
  }

  getLoginUser(): User {
    return this._loggedInUser;
  }

}
