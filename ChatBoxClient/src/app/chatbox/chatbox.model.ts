import { SidePanelModel } from "./side-panel/side-panel.model";
import { ChatPanelModel } from "./chat-panel/chat-panel.model";

export class ChatBoxModel {
    public activeChat: ChatPanelModel;
    public chatPanels: ChatPanelModel[];
    public sidePanelModel : SidePanelModel;
}