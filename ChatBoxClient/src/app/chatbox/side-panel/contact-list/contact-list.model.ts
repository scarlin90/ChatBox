import { User } from "../../../shared/user/user.model";

export class ContactListModel {
    users: User[];
    loggedInUser: User;
}