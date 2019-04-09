import { ContactListModel } from "./contact-list/contact-list.model";
import { ChatPanelModel } from "../chat-panel/chat-panel.model";

export class SidePanelModel {
    createGroupName: string = '';
    groups: Group[];
    public contactListModel: ContactListModel;
    public chatPanels: ChatPanelModel[];
}

export class Group {
    name: string;
    isMember: boolean;
}