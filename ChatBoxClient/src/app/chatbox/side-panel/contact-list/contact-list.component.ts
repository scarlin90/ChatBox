import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";

import { ContactListModel } from "./contact-list.model";
import { User } from "../../../shared/user/user.model";

@Component({
  selector: "app-contact-list",
  templateUrl: "./contact-list.component.html",
  styleUrls: ["./contact-list.component.css"]
})
export class ContactListComponent implements OnInit {
  @Input() model: ContactListModel;

  @Output() createChat: EventEmitter<User> = new EventEmitter<User>();
  @Output() createGroupChat: EventEmitter<User> = new EventEmitter<User>();

  constructor() {}

  ngOnInit() {}

  onCreateChat(user: User) {
    this.createChat.emit(user);
  }

  onCreateGroupChat(user: User) {
    this.createGroupChat.emit(user);
  }
}
