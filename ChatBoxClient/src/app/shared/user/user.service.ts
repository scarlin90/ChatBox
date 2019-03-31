import { Injectable } from '@angular/core';
import { User, UserList } from './user.model';

@Injectable()
export class UserService {

  private _loggedInUser: User;

  constructor() { }

  getUsers(): User[] {
    return UserList.APPUSERS;
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

  getLoginUser(): User {
    return this._loggedInUser;
  }

}
