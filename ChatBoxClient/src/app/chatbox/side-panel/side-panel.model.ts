import { ContactListModel } from "./contact-list/contact-list.model";

export class SidePanelModel {
    groups: Group[];
    public contactListModel: ContactListModel;
}

export class Group {
    name: string;
    isMember: boolean;
}