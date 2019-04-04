import { Component, OnInit, Input } from "@angular/core";

import { ContactListModel } from "./contact-list.model";

@Component({
  selector: "app-contact-list",
  templateUrl: "./contact-list.component.html",
  styleUrls: ["./contact-list.component.css"]
})
export class ContactListComponent implements OnInit {
  @Input() model: ContactListModel;

  constructor() {}

  ngOnInit() {}
}
