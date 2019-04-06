
export class User {
    public id: number;
    public username: string;
    public firstname: string;
    public lastname:string;
    public isOnline: boolean;
    public connectionId: string;
}

export class UserList {
    public static APPUSERS: User[] = [{
        id: 1,
        firstname: 'Sean',
        lastname: 'Carlin',
        username: 'scarlin',
        isOnline: false,
        connectionId: ''    
    },
    {
        id: 2,
        firstname: 'Steve',
        lastname: 'Jobs',
        username: 'sjobs',
        isOnline: false,
        connectionId: ''  
    },
    {
        id: 3,
        firstname: 'Bill',
        lastname: 'Gates',
        username: 'bgates',
        isOnline: false,
        connectionId: ''  
    },
    {
        id: 4,
        firstname: 'Elon ',
        lastname: 'Musk',
        username: 'emusk',
        isOnline: false,
        connectionId: ''  
    },
    {
        id: 5,
        firstname: 'Jeff ',
        lastname: 'Bezos',
        username: 'jbezos',
        isOnline: false,
        connectionId: ''  
    },
]
}