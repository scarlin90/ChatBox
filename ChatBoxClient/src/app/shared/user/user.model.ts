
export class User {
    public id: number;
    public username: string;
    public firstname: string;
    public lastname:string;
    public isOnline: boolean;
    public avatar: string;
    public connectionId: string;
}

export class UserList {
    public static APPUSERS: User[] = [{
        id: 1,
        firstname: 'Sean',
        lastname: 'Carlin',
        username: 'scarlin',
        isOnline: false,
        connectionId: '',
        avatar: 'https://avatars1.githubusercontent.com/u/11627098?s=400&v=4'
    },
    {
        id: 2,
        firstname: 'Steve',
        lastname: 'Jobs',
        username: 'sjobs',
        isOnline: false,
        connectionId: '',
        avatar: 'https://www.peoplecorp.com.au/wp-content/uploads/2015/04/steve-jobs-portrait1.jpg'
    },
    {
        id: 3,
        firstname: 'Bill',
        lastname: 'Gates',
        username: 'bgates',
        isOnline: false,
        connectionId: '' ,
        avatar: 'https://assets.change.org/photos/5/os/eu/ohoseUuxFpDALWx-400x400-noPad.jpg?1528809444'
    },
    {
        id: 4,
        firstname: 'Elon ',
        lastname: 'Musk',
        username: 'emusk',
        isOnline: false,
        connectionId: '' ,
        avatar: 'https://fm.cnbc.com/applications/cnbc.com/resources/img/editorial/2018/02/07/104994096-RTX4RL3G.400x400.jpg'
    },
    {
        id: 5,
        firstname: 'Jeff ',
        lastname: 'Bezos',
        username: 'jbezos',
        isOnline: false,
        connectionId: '',
        avatar: 'http://www.stickpng.com/assets/images/584dfc916a5ae41a83ddee19.png'
    },
]
}