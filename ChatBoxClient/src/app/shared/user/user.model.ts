
export class User {
    public id: number;
    public username: string;
    public firstName: string;
    public lastname:string;
    public isOnline: boolean;
    public connectionId: string;
}

export class UserList {
    public static APPUSERS: User[] = [{
        id: 1,
        firstName: 'Sean',
        lastname: 'Carlin',
        username: 'scarlin',
        isOnline: false,
        connectionId: ''    
    },
    {
        id: 2,
        firstName: 'Steve',
        lastname: 'Jobs',
        username: 'sjobs',
        isOnline: false,
        connectionId: ''  
    },
    {
        id: 3,
        firstName: 'Bill',
        lastname: 'Gates',
        username: 'bgates',
        isOnline: false,
        connectionId: ''  
    },
    {
        id: 4,
        firstName: 'Elon ',
        lastname: 'Musk',
        username: 'emusk',
        isOnline: false,
        connectionId: ''  
    },
    {
        id: 5,
        firstName: 'Jeff ',
        lastname: 'Bezos',
        username: 'jbezos',
        isOnline: false,
        connectionId: ''  
    },
]
}