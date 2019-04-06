export class ChatPanelModel {
    chatId: string;
    type:ChatType
    chatHistory: MessageModel[];
    recipients: string[];
}

export enum ChatType {
    Private,
    Group
}

export class MessageModel {
    body: string;
    sender: string;
    timestamp: Date;
}