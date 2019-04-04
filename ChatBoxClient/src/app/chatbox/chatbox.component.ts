import { Component, OnInit } from "@angular/core";
import { ChatBoxModel } from "./chatbox.model";
import { UserService } from "../shared/user/user.service";

@Component({
  selector: "app-chatbox",
  templateUrl: "./chatbox.component.html",
  styleUrls: ["./chatbox.component.css"]
})
export class ChatboxComponent implements OnInit {
  public model: ChatBoxModel;

  constructor(private _userService: UserService) {}

  ngOnInit() {
    this.model = {
      sidePanelModel: {
        contactListModel: {
          loggedInUser: this._userService.getLoginUser(),
          users: this._userService.getUsers()
        }
      },
      chatPanelModel: {
        
      }
    };
  }
}
